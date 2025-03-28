export function computeAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  
export function computeSex(sex) {
    switch (sex){
      case "M":
          return "Uomo";
      case "F":
          return "Donna";
      default:
          return "Non specificato";
    }
  }
  
  export function computeFirstBySex(sex) {
    switch (sex){
      case "M":
          return "Sig.";
      case "F":
          return "Sig.ra";
      default:
          return "Non specificato";
    }
  }
  