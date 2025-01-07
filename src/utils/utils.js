export async function getToken() {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          'Content-Type': "application/x-www-form-urlencoded",
          'Authorization': `Basic ${btoa("3ff5f488052a491a83a37c242249c6c2" + ":" + "e70b151147884ff982e1dcc845fbbe8a")}`
        },
        body: "grant_type=client_credentials"
      });
  
      const auth = await response.json();
      if (auth.access_token) {
        localStorage.setItem('token', `${auth.token_type} ${auth.access_token}`);
        console.log("Token set:", auth.access_token);
      } else {
        console.error("Token not received:", auth);
      }
    } catch (error) {
      console.log(error);
    }
  }
  