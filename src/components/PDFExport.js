import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  header: { marginBottom: 20, borderBottom: 1, borderColor: '#000', paddingBottom: 10 },
  name: { fontSize: 24, fontWeight: "bold" },
  section: { marginBottom: 15 },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5,
    backgroundColor: '#f3f4f6',
    padding: 5
  },
  experienceItem: { marginBottom: 10 },
  jobTitle: { fontWeight: "bold" },
  company: { fontStyle: "italic", marginBottom: 3 }
});

export const MyDocument = ({ resume }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{resume.name}</Text>
      </View>

      {resume.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text>{resume.summary}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {resume.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{exp.role}</Text>
            <Text style={styles.company}>{exp.company}</Text>
            <Text>{exp.achievements}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);