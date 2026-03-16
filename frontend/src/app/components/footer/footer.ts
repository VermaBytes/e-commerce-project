import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {

  currentYear = new Date().getFullYear();

  footerSections = [
    {
      title: 'Shop',
      links: [
        'Mobile Phones',
        'Laptops',
        'Tablets',
        'Accessories',
        'Smart Watches'
      ]
    },
    {
      title: 'Customer Service',
      links: [
        'Contact Us',
        'Track Order',
        'Return & Refund',
        'FAQ',
        'Shipping Policy'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Careers',
        'Blog',
        'Press',
        'Affiliate Program'
      ]
    },
    {
      title: 'Legal',
      links: [
        'Privacy Policy',
        'Terms & Conditions',
        'Cookie Policy',
        'Security',
        'Sitemap'
      ]
    }
  ];

  paymentMethods = [
    'Visa',
    'MasterCard',
    'UPI',
    'Paytm',
    'Cash on Delivery'
  ];

}