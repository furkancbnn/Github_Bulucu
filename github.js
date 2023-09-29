class Github {
   // istek atma için gerekli bilgiler
   constructor() {
      this.clientId = "1ae950e660c5ad0f53fc";
      this.clientSecret = "7a3dbac941965125401abfd93c8e84c61e8c59d8";
      this.perPage = 10;
      this.sort = "asc";
   }

   // api den kullanıcı getir
   async getUser(username) {
      // parametre olarak gelen kullanıcı bilgisine göre istek aatma
      const profileRes = await fetch(
         `https://api.github.com/users/${username}?client_id=${this.clientId}&client_secret=${this.clientSecret}`
      );

      // repo bilgilerini alma
      const repoRes = await fetch(
         `https://api.github.com/users/${username}/repos?per_page=${this.perPage}&sort=${this.sort}&client_id=${this.clientId}&client_secret=${this.clientSecret}`
      );

      const profile = await profileRes.json();
      const repos = await repoRes.json();

      // fonksiyonun çağırıldığı yere profil ve repo bilgisini gönderme
      return { profile, repos };
   }
}

export default Github;
