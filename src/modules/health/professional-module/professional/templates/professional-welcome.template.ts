interface ProfessionalWelcomeTemplateData {
  doctorName: string;
  clinicName: string;
  cooperativeName: string;
  responsibleName: string;
  responsibleRole: string;
  contact: string;
}

export function getProfessionalWelcomeTemplate(
  data: ProfessionalWelcomeTemplateData,
): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `Bem-vindo(a) à ${data.clinicName} - Termo de Prestação de Serviço Médico`;

  const text = `
Termo de Prestação de Serviço Médico via Cooperativa

Prezado(a) Dr(a). ${data.doctorName},

Este termo tem como objetivo esclarecer as condições da sua prestação de serviços médicos junto à ${data.clinicName} por meio da ${data.cooperativeName}.

Natureza da Prestação de Serviço:

- Sua atuação será realizada como médico cooperado, respeitando as diretrizes e normas estabelecidas pela cooperativa e pela nossa instituição.
- A relação mantida entre as partes não configura vínculo empregatício, sendo regida pelos princípios do cooperativismo.

Condições de Pagamento:

- Os honorários médicos serão pagos diretamente pela cooperativa, conforme tabela previamente acordada.
- Os pagamentos seguirão a periodicidade e os prazos estabelecidos pela cooperativa, podendo variar conforme a convenção vigente.

Escalas e Atendimentos:

- As escalas de atendimento serão organizadas previamente e disponibilizadas através do nosso sistema.
- O médico cooperado deverá seguir os protocolos assistenciais e administrativos exigidos pela clínica.

Compromisso com Ética e Qualidade:

- O médico deverá atuar de acordo com as diretrizes do Conselho Regional de Medicina e demais órgãos reguladores.
- Qualquer descumprimento das normas estabelecidas poderá acarretar o desligamento da escala.

Ao aceitar este termo e confirmar seu cadastro, você concorda com os pontos acima e se compromete a atuar dentro das diretrizes estabelecidas.

Caso tenha dúvidas, estamos à disposição.

Atenciosamente,
${data.responsibleName}
${data.responsibleRole} - ${data.clinicName}
${data.contact}
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #2c5282;
      font-size: 24px;
      margin-bottom: 20px;
    }
    h2 {
      color: #2c5282;
      font-size: 20px;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    ul {
      margin-bottom: 20px;
      padding-left: 20px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <h1>Termo de Prestação de Serviço Médico via Cooperativa</h1>
  
  <p>Prezado(a) Dr(a). ${data.doctorName},</p>
  
  <p>Este termo tem como objetivo esclarecer as condições da sua prestação de serviços médicos junto à <strong>${data.clinicName}</strong> por meio da <strong>${data.cooperativeName}</strong>.</p>
  
  <h2>Natureza da Prestação de Serviço:</h2>
  <ul>
    <li>Sua atuação será realizada como médico cooperado, respeitando as diretrizes e normas estabelecidas pela cooperativa e pela nossa instituição.</li>
    <li>A relação mantida entre as partes não configura vínculo empregatício, sendo regida pelos princípios do cooperativismo.</li>
  </ul>
  
  <h2>Condições de Pagamento:</h2>
  <ul>
    <li>Os honorários médicos serão pagos diretamente pela cooperativa, conforme tabela previamente acordada.</li>
    <li>Os pagamentos seguirão a periodicidade e os prazos estabelecidos pela cooperativa, podendo variar conforme a convenção vigente.</li>
  </ul>
  
  <h2>Escalas e Atendimentos:</h2>
  <ul>
    <li>As escalas de atendimento serão organizadas previamente e disponibilizadas através do nosso sistema.</li>
    <li>O médico cooperado deverá seguir os protocolos assistenciais e administrativos exigidos pela clínica.</li>
  </ul>
  
  <h2>Compromisso com Ética e Qualidade:</h2>
  <ul>
    <li>O médico deverá atuar de acordo com as diretrizes do Conselho Regional de Medicina e demais órgãos reguladores.</li>
    <li>Qualquer descumprimento das normas estabelecidas poderá acarretar o desligamento da escala.</li>
  </ul>
  
  <p>Ao aceitar este termo e confirmar seu cadastro, você concorda com os pontos acima e se compromete a atuar dentro das diretrizes estabelecidas.</p>
  
  <p>Caso tenha dúvidas, estamos à disposição.</p>
  
  <div class="footer">
    <p>Atenciosamente,<br>
    <strong>${data.responsibleName}</strong><br>
    ${data.responsibleRole} - ${data.clinicName}<br>
    ${data.contact}</p>
  </div>
</body>
</html>
`;

  return {
    subject,
    text,
    html,
  };
}
