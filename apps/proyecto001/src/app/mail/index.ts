
export const sendVerificationEmail = async (email:string, name:string, url:string) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verificacion de Correo de Mi-Adviser.",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/djbbxqxvj/image/upload/v1703958199/My%20Adviser/Logo-Mi-Adviser/imagotipo.png" alt="" style="width:30px"><span>accion requedida : Activa tu cuenta de Mi-Adviser</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hola! ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Tu recientemente creaste tu cuenta en My-Adviser. para completar en registro de tu cuenta en la plataforma, por favor de <b>confirmar</b> tu cuenta para llevarte con asesores segun a tu carrera con mas preparacion y experiencia.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#e0507f;color:#fff;text-decoration:none;font-weight:600">Confirmar</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Mi-Adviser te contactara con asesores preparados para ser el mejor de tu carrera profesional, una vez registrado en Mi-Adviser, podras conectarte con <b>asesores</b> de alto conocimiento, organizando reuniones y asesoramiento que te pida el asesor.</span></div></div>`,
  };
  return mailOptions;
};