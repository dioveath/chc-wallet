// Entity - User

var buildMakeUser = function(userValidator, bcrypt){
  return async ({
    fullName,
    password,
    email,
    phoneNumber,
    branchId
  } = {}) => {

    var error = userValidator({
      fullName,
      password,
      email,
      phoneNumber,
      branchId
    });

    if(error instanceof Object) throw new Error(error.errorList);

    // create password hash
    const saltRounds = 5;
    var salt;
    var hashedPassword;

    console.log(password);
    if(password != undefined) {
      salt = await bcrypt.genSalt(saltRounds);
      console.log(password);
      hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);
    }

    return Object.freeze({
      getFullName: () => fullName,
      getPassword: () => hashedPassword,
      getEmail: () => email,
      getPhoneNumber: () => phoneNumber,      
      getBranchId: () => branchId
    });

  };

};


module.exports = buildMakeUser;
