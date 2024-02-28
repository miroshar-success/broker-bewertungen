import React from 'react';
import Layout from './Layout';
import Typography from '@mui/material/Typography';

function Contact({ ...props }) {
  return (
    <Layout url={props.url} noIndex>
      <Typography variant="h3">
        Kontakt zu broker-bewertungen.de aufnehmen
      </Typography>
      <Typography variant="body2" fontWeight="regular">
        Um uns eine Nachricht zukommen zu lassen benutzen
        Sie bitte das Formular.
      </Typography>
    </Layout>
  );
}

export default Contact;
