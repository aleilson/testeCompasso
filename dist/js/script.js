//Fnção anonima
(function() {
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url = "https://api.github.com/users";
    const client_id ="2d42b1fb696c80b5c67f";
    const client_secret = "4f6cba2079ca5265bdc053983e96baeed251417a";    

    async function getUser(user){
        //Template String
        let profileResponse;
        await fetch(`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`)
            .then(handleErrors)
            .then(function(response) {
                profileResponse = response;
            })
            .catch(function(error) {
                returnError()
            });

        //CONVERTENDO EM JSON
        const profile = await profileResponse.json();
        profile.ver_perfil = 'Ver perfil';
        return {profile};
    }
    // FUNCAO QUE TRATA ERROS
    function handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    function returnError() {
        let user = {
            avatar_url: 'dist/images/interrogation.jpg',
            public_repos: '?',
            followers: '?',
            following: '?',
            html_url: '#',
            ver_perfil: 'Digite um perfil válido.'
            }
        showProfile(user)
    }

    function showProfile(user){
        profile.innerHTML = `
        <div class="row mt-3">
            <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${user.avatar_url}">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Repositórios: <span class="badge badge-success">${user.public_repos}</span></li>
                        <li class="list-group-item">Seguidores: <span class="badge badge-primary">${user.followers}</span></li>
                        <li class="list-group-item">Seguindo: <span class="badge badge-info">${user.following}</span></li>
                    </ul>
                    <div class="class-body">
                        <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-block">${user.ver_perfil}</a>
                    </div>
                </div>
            </div>
        </div>`;
    }

    search.addEventListener("keyup", e =>{
        const user = e.target.value;
        console.log(user.length)
        if(user.length > 0) {
            getUser(user).then(res => { 
                showProfile(res.profile);
            });
        }
    });

})();

