const $login = function(data) {

  return $.ajax({
    method: "POST",
    url: "/login",
    data,

    success: function(json) {
      console.log(json);
      if (!json.user) {
        window.alert('Failed to login!');
        return;
      }
      window.alert("Login Successfully!");
    }

  });
};

const $signup = function(data) {

  return $.ajax({
    method: "POST",
    url: "/users",
    data,

    success: function(json) {
      console.log(json);
      if (!json.user) {
        window.alert('Sign up failed!');
        return;
      }
      window.alert("Signup Successfully!");
    }
      
  });
  
};
