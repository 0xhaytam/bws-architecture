// AUTO-GENERATED CLIENT REGISTRY - DO NOT EDIT
// Contains only sections enabled for this website.

import { AgencyHero as AgencyHeroSection } from "@/src/components/organisms/AgencyHero";
import { AgencyProfile as AgencyProfileSection } from "@/src/components/organisms/AgencyProfile";
import { ArchitecturalApproach as ArchitecturalApproachSection } from "@/src/components/organisms/ArchitecturalApproach";
import { ArchitecturalVision as ArchitecturalVisionSection } from "@/src/components/organisms/ArchitecturalVision";
import { ContactDetails as ContactDetailsSection } from "@/src/components/organisms/ContactDetails";
import { ContactHero as ContactHeroSection } from "@/src/components/organisms/ContactHero";
import { ContactLocation as ContactLocationSection } from "@/src/components/organisms/ContactLocation";
import { ContactReassurance as ContactReassuranceSection } from "@/src/components/organisms/ContactReassurance";
import { ExpertiseBenefits as ExpertiseBenefitsSection } from "@/src/components/organisms/ExpertiseBenefits";
import { ExpertiseFocus as ExpertiseFocusSection } from "@/src/components/organisms/ExpertiseFocus";
import { ExpertiseHero as ExpertiseHeroSection } from "@/src/components/organisms/ExpertiseHero";
import { ExpertiseIntroduction as ExpertiseIntroductionSection } from "@/src/components/organisms/ExpertiseIntroduction";
import { ExpertiseOverview as ExpertiseOverviewSection } from "@/src/components/organisms/ExpertiseOverview";
import { HomeHero as HomeHeroSection } from "@/src/components/organisms/HomeHero";
import { PracticeIntroduction as PracticeIntroductionSection } from "@/src/components/organisms/PracticeIntroduction";
import { ProjectCallToAction as ProjectCallToActionSection } from "@/src/components/organisms/ProjectCallToAction";
import { ProjectGallery as ProjectGallerySection } from "@/src/components/organisms/ProjectGallery";
import { ProjectInvitation as ProjectInvitationSection } from "@/src/components/organisms/ProjectInvitation";
import { ProjectSubmission as ProjectSubmissionSection } from "@/src/components/organisms/ProjectSubmission";

export const componentRegistry = {
  "agency_hero": AgencyHeroSection,
  "agency_profile": AgencyProfileSection,
  "architectural_approach": ArchitecturalApproachSection,
  "architectural_vision": ArchitecturalVisionSection,
  "contact_details": ContactDetailsSection,
  "contact_hero": ContactHeroSection,
  "contact_location": ContactLocationSection,
  "contact_reassurance": ContactReassuranceSection,
  "expertise_benefits": ExpertiseBenefitsSection,
  "expertise_focus": ExpertiseFocusSection,
  "expertise_hero": ExpertiseHeroSection,
  "expertise_introduction": ExpertiseIntroductionSection,
  "expertise_overview": ExpertiseOverviewSection,
  "home_hero": HomeHeroSection,
  "practice_introduction": PracticeIntroductionSection,
  "project_call_to_action": ProjectCallToActionSection,
  "project_gallery": ProjectGallerySection,
  "project_invitation": ProjectInvitationSection,
  "project_submission": ProjectSubmissionSection,
} as const;

export type RegisteredSectionName = keyof typeof componentRegistry;
export type RegisteredSectionComponent =
  (typeof componentRegistry)[RegisteredSectionName];

export function getComponent(
  name: string,
): RegisteredSectionComponent | undefined {
  return componentRegistry[name as RegisteredSectionName];
}
