import React from 'react'
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

function Testimonials() {
    const testimonials = [
        {
          quote:
            "The iPhone 9 exceeded my expectations. The performance is smooth, and the camera quality is outstanding. SHOPSMART made the purchase process seamless and quick.",
          name: "Jonathan R.",
          designation: "Customer of iPhone 9",
          src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          quote:
            "I recently bought the MacBook Pro, and it's been a game-changer for my work. The speed and display are top-notch. SHOPSMART's service was excellent, with fast delivery and great customer support.",
          name: "Linda A.",
          designation: "Customer of MacBook Pro",
          src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
        },
        {
          quote:
            "The Samsung Galaxy Book is lightweight and powerful, perfect for my on-the-go lifestyle. SHOPSMART provided detailed product information, making my decision easy.",
          name: "Felix T.",
          designation: "Customer of Samsung Galaxy Book",
          src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          quote:
            "I purchased the Microsoft Surface Laptop 4, and it's been fantastic for both work and entertainment. SHOPSMART's website was user-friendly, and the checkout process was smooth.",
          name: "Sara K.",
          designation: "Customer of Microsoft Surface Laptop 4",
          src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
        },
        {
          quote:
            "The HP Pavilion 15-DK1056WM is a great gaming laptop with impressive graphics. SHOPSMART offered the best price, and the delivery was prompt and well-packaged.",
          name: "Ali M.",
          designation: "Customer of HP Pavilion 15-DK1056WM",
          src: "https://images.unsplash.com/flagged/photo-1596479042555-9265a7fa7983?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ];
      
      return <AnimatedTestimonials testimonials={testimonials} />;
    }

export default Testimonials