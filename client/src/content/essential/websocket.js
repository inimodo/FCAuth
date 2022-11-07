
class FetchFromWeb {
  static headers(body)
  {
    var header = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    }
    header.body = JSON.stringify(body)
    return header;
  }

  static async post(url,body)
  {
    const response = await fetch(url,this.headers(body));
    return response.json();
  }
}
class Backend extends FetchFromWeb
{
  static async access(email)
  {
    return this.post("https://www.ucpsystems.com/access.php",{email:email});
  }
  static async ask(public_token)
  {
    return this.post("https://www.ucpsystems.com/ask.php",{pbt:public_token});
  }
  static async check(public_token,perms)
  {
    return this.post("https://www.ucpsystems.com/ask.php",{pbt:public_token,perms:perms});
  }
}
export default Backend;
