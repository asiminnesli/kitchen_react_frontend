const pluralUserTypeBuilder = (userType) => {
  switch (userType) {
    case "company":
      return "companies";
    case "admin":
      return "admin/dashboard";
    default:
      return "users";
  }
};
export default pluralUserTypeBuilder;
