import HeroSection from "@/components/sections/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import EventsPreview from "@/components/sections/EventsPreview";
import MembershipSection from "@/components/sections/MembershipSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import CTABanner from "@/components/sections/CTABanner";
import NewsPreview from "@/components/sections/NewsPreview";

export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <>
      <HeroSection locale={params.locale} />
      <MissionSection />
      <EventsPreview locale={params.locale} />
      <MembershipSection locale={params.locale} />
      <GalleryPreview locale={params.locale} />
      <NewsPreview locale={params.locale} />
      <CTABanner locale={params.locale} />
    </>
  );
}
