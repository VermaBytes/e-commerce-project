import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../Orders-page/order.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  selectedOrderItems: any[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe((data: any) => {
      this.orders = data;
      this.cdr.detectChanges();
    });
  }

  viewDetails(orderId: number) {
    this.orderService.getOrderDetails(orderId).subscribe((data: any) => {
      this.selectedOrderItems = data;
    });
  }

  acceptOrder(id: number) {
    this.orderService.updateStatus(id).subscribe(() => {
      alert('Order Accepted ✅');
      this.loadOrders();
    });
  }

  changeStatus(id: number, status: string) {
    this.orderService.updateOrderStatus(id, status).subscribe(() => {
      alert('Status Updated');

      this.loadOrders(); // refresh list
    });
  }
  downloadInvoice(order: any) {
    this.orderService.getOrderDetails(order.id).subscribe((items: any[]) => {
      const doc = new jsPDF();
      const img = new Image();

      img.src = 'assets/images/COMPANY LOGO.jpeg';

      img.onload = () => {
        // 🔷 LOGO POSITION
        const logoY = 10;
        const logoHeight = 25;

        doc.addImage(img, 'JPEG', 10, logoY, 25, logoHeight);

        // 🔷 HEADER TITLE (CENTER)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('INVOICE', 105, 20, { align: 'center' });

        // 🔷 ORDER INFO (RIGHT)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Order ID: ${order.id}`, 200, 15, { align: 'right' });
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 200, 21, { align: 'right' });

        // 🔷 LINE BELOW LOGO (NO OVERLAP FIX)
        const headerBottom = logoY + logoHeight + 8;

        doc.setDrawColor(200);
        doc.line(10, headerBottom, 200, headerBottom);

        // 🔷 BILL TO START POSITION
        let startY = headerBottom + 10;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Bill To:', 10, startY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Name: ${order.name}`, 10, startY + 8);
        doc.text(`Phone: ${order.phone}`, 10, startY + 14);
        doc.text(`Address: ${order.address}`, 10, startY + 20, { maxWidth: 90 });
        // 🔷 WATERMARK (CENTER LOGO)
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        (doc as any).setGState(new (doc as any).GState({ opacity: 0.08 })); // light watermark

        doc.addImage(
          img,
          'assets/images/COMPANY LOGO.jpeg',
          pageWidth / 2 - 40,
          pageHeight / 2 - 40,
          80,
          80,
        );

        (doc as any).setGState(new (doc as any).GState({ opacity: 1 })); // reset
        // 🔷 TABLE DATA (NUMBER FIX + WRAP)
        const tableData = items.map((item) => {
          const price = Number(item.price);
          const qty = Number(item.quantity);

          return [
            doc.splitTextToSize(item.name, 85),
            qty,
            `Rs. ${price.toFixed(2)}`,
            `Rs. ${(price * qty).toFixed(2)}`,
          ];
        });

        // 🔷 TABLE
        autoTable(doc, {
          startY: startY + 35,
          margin: { left: 10, right: 10 },

          head: [['Product', 'Qty', 'Price', 'Total']],
          body: tableData,

          styles: {
            fontSize: 10,
            cellPadding: 5,
            valign: 'middle',
          },

          headStyles: {
            fillColor: [52, 152, 219],
            textColor: 255,
            halign: 'center',
          },

          columnStyles: {
            0: { cellWidth: 90 },
            1: { halign: 'center', cellWidth: 20 },
            2: { halign: 'right', cellWidth: 40 },
            3: { halign: 'right', cellWidth: 40 },
          },
        });

        // 🔷 FINAL Y
        const finalY = (doc as any).lastAutoTable.finalY || 100;

        // 🔷 GRAND TOTAL
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text(`Grand Total: Rs. ${Number(order.total).toFixed(2)}`, 200, finalY + 15, {
          align: 'right',
        });

        // 🔷 FOOTER LINE
        doc.setDrawColor(200);
        doc.line(10, finalY + 20, 200, finalY + 20);

        // 🔷 FOOTER TEXT (CENTER FIXED)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.setCharSpace(0); // spacing fix

        doc.text('Thank you for shopping with Aradhyam', 100, finalY + 30, { align: 'center' });
        doc.text('Visit Again!', 100, finalY + 36, { align: 'center' });

        // 🔷 SAVE
        doc.save(`invoice_${order.id}.pdf`);
      };
    });
  }
}
