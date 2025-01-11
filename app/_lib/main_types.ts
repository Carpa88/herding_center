import { IconType } from "@node_modules/react-icons/lib";

export interface ITestimonial
  {
    userName: string;
    userNic?: string;
    testimonial: string;
    icon: string;
  }

  export interface ISscial {
    id: string;
    name: string;
    value: string;
    icon: IconType; 
  }