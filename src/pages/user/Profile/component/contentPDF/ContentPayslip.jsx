import React from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

export default function ContentPayslip() {
  
  // const Title = () => {
  //   return (
  //   <View style={{flexDirection: 'row',marginTop: 24}}>
  //     {/* <View style={{flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" }}> */}
  //       {/* <Image style={{ width: 90 }} src={"https://img.freepik.com/premium-vector/drawing-porcupine-that-is-white-background_867442-29313.jpg?w=740"} /> */}
  //       <Text style={{  fontSize: 16,  textAlign: 'center' }}>My-CreW ^__^</Text>
  //     {/* </View> */}
  //   </View>
  // )};

  // const Form = () => (
  //   <View style={{flexDirection: 'row',marginTop: 24}}>
  //     <View style={{flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" }}>
  //       <Image style={styles.logo} src={"./asset/Payslip03.png"} />
  //     </View>
  //   </View>
  // );
  // const Information = () => (
  //   <View style={{flexDirection: 'row',marginTop: 24}}>
  //     <View style={{flex : 1,flexDirection: 'row',alignItems:'center',justifyContent:'space-between',color: "#3E3E3E" }}>
  //       <View>
  //         <Text style={{  fontSize: 16,  textAlign: 'center' }}>PaySlip</Text>
  //       </View>
  //       <View>
  //         <Text style={{  fontSize: 16,  textAlign: 'center' }}>First Name : XXXXXX, Family Name : XXXXX</Text>
  //         <Text style={{  fontSize: 16,  textAlign: 'center' }}>Position : XXXX , Department : XXXX </Text>
  //       </View>
  //     </View>
  //   </View>
  // );

  // return (
  //   <Document title="payslip">
  //     <Page
  //       size="A5"
  //       orientation="landscape"
  //       style={{
  //         backgroundColor: "white",
  //       }}
  //     >
  //       <View
  //         style={{
  //           flex: true,
  //           flexDirection: "column",
  //           backgroundColor: "white",
  //         }}
  //       >
  //         <Title style={{borderBottom : "solid", paddingBottom : 14, flex:true}} />
  //         <Form />
  //         {/* <Information /> */}
  //       </View>
  //     </Page>
  //   </Document>
  // );

  // Define some styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  section: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#3E3E3E",
    width : 140,
    height : 140, 
    backgroundColor : "tomato"
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    borderBottom: "solid 2px #000",
    paddingBottom: 14,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  logo: {
    width: 90,
    height : 90
  },
});

const Title = () => (
  <View style={styles.section}>
    <Text style={styles.title}>My-CreW ^__^</Text>
  </View>
);

const Form = () => (
  <View style={styles.section}>
    <Image style={styles.logo} src={"./asset/Payslip03.png"} />
  </View>
);

const Information = () => (
  <View style={styles.section}>
    <View>
      <Text style={styles.text}>PaySlip</Text>
    </View>
    <View>
      <Text style={styles.text}>First Name: XXXXXX, Family Name: XXXXX</Text>
      <Text style={styles.text}>Position: XXXX, Department: XXXX</Text>
    </View>
  </View>
);

const PayslipDocument = () => (
  <Document title="Payslip">
    <Page size="A5" orientation="landscape" style={styles.page}>
      <Title />
      <Form />
      <Information />
    </Page>
  </Document>
);

return <PayslipDocument />

}
