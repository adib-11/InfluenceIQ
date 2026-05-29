import { landingMarkup } from "./landingMarkup";

export default function LandingStatic() {
  return <div dangerouslySetInnerHTML={{ __html: landingMarkup }} />;
}
