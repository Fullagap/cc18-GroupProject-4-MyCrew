import { PDFViewer } from "@react-pdf/renderer";
import ContentPayslip from "./contentPayslip";

export default function PDFViewModel() {
  return (
    <div>
      <PDFViewer width="1000" height="650" className="app">
        <ContentPayslip />
      </PDFViewer>
    </div>
  );
}
