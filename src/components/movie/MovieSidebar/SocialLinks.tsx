import { Instagram, Youtube, Github } from "lucide-react";

const SocialLinks = () => (
  <div className="flex justify-between items-center space-x-4">
    <div>
      <h3 className="text-lg text-medium-grey font-bold">Thank you</h3>
      <div className="text-xs section-description font-normal">Our social networks</div>
    </div>
    <div className="flex space-x-4">
      <a href="#" className="bg-[#1A1A1A] p-2 rounded-xl flex items-center justify-center hover:bg-charcoal transition">
        <Instagram className="h-5 w-5 text-medium-grey" />
      </a>
      <a href="#" className="bg-[#1A1A1A] p-2 rounded-xl flex items-center justify-center hover:bg-charcoal transition">
        <Youtube className="h-5 w-5 text-medium-grey" />
      </a>
      <a href="#" className="bg-[#1A1A1A] p-2 rounded-xl flex items-center justify-center hover:bg-charcoal transition">
        <Github className="h-5 w-5 text-medium-grey" />
      </a>
    </div>
  </div>
);

export default SocialLinks;