export const emailVerifield = (email:string):boolean => {
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailPattern.test(email);
}