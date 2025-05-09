interface AdSectionProps {
    adImageUrl: string;
}
  
const AdSection = ({ adImageUrl }: AdSectionProps) => (
    <div className="mb-8">
        <h3 className="text-lg text-medium-grey font-bold">Advertising</h3>
        <div className="text-xs section-description font-normal mb-4">
            Movies that might like you
        </div>
        <div className="bg-[#2D2D2D] rounded-lg overflow-hidden">
        <img src={adImageUrl} alt="Advertisement" className="w-full h-160 object-cover" />
        </div>
    </div>
);

export default AdSection;  