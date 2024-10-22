'use client'

interface Usuario {
  uid: string;
  nome: string | null;
  email: string | null;
  token: string;
  provedor: string | undefined;
  imagemUrl: string | null;  // Changed this line
}

export default Usuario;