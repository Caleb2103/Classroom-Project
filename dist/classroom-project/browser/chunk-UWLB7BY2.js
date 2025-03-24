import{d as j}from"./chunk-OM6IEVGJ.js";import{a as S,b as F}from"./chunk-FGMIOTAT.js";import{Ea as w,Na as b,O as x,Qa as t,Ra as i,Sa as s,T as y,Wa as a,Za as r,fb as f,o as v,tb as E,ua as d,va as p,wb as C,y as u,za as g}from"./chunk-WRZYRVEU.js";var c=class l{constructor(e){this.http=e}basePath="http://127.0.0.1:8000/main/login";httpOptions={headers:new S({"Content-Type":"application/json"})};handleError(e){return e.error instanceof ErrorEvent?console.log(`An error occurred: ${e.error.message} `):console.error(`Backend returned code ${e.status}, body was: ${e.error}`),v(()=>new Error("Something happened with request, please try again later"))}importCredentials(e){let n=`${this.basePath}/upload-credentials/`,o=new FormData;return o.append("file",e),this.http.post(n,o).pipe(u(this.handleError))}loginAccount(){let e=`${this.basePath}/sign-in/`;return this.http.get(e).pipe(u(this.handleError))}static \u0275fac=function(n){return new(n||l)(y(F))};static \u0275prov=x({token:l,factory:l.\u0275fac,providedIn:"root"})};var _=(l,e)=>({"bg-blue-600 hover:bg-blue-700 cursor-pointer text-white":l,"bg-gray-200 cursor-not-allowed text-gray-500":e}),k=class l{constructor(e,n){this.router=e;this.loginService=n}selectedFile=null;loginButton=!0;onFileSelected(e){let n=e.target;n.files&&n.files.length>0&&(this.selectedFile=n.files[0]),console.log(this.loginButton)}uploadCredentials(e){e.preventDefault(),this.selectedFile?this.loginService.importCredentials(this.selectedFile).subscribe({next:n=>{console.log("Archivo subido correctamente:",n),this.loginButton=!1},error:n=>{console.error("Error al subir el archivo:",n),alert("Error al subir el archivo")}}):alert("Por favor selecciona un archivo antes de subir.")}login(){this.loginService.loginAccount().subscribe({next:e=>{console.log("Archivo subido correctamente:",e),this.router.navigate(["/home"])},error:e=>{console.error("Error al subir el archivo:",e),alert("Error al subir el archivo")}})}static \u0275fac=function(n){return new(n||l)(g(j),g(c))};static \u0275cmp=w({type:l,selectors:[["app-login"]],decls:53,vars:10,consts:[["lang","es"],["charset","UTF-8"],["name","viewport","content","width=device-width, initial-scale=1.0"],["href",d`https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap`,"rel","stylesheet"],["rel","stylesheet","href",d`https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css`],[1,"flex","min-h-screen"],[1,"w-1/2","flex","flex-col","justify-center","items-center","p-10"],[1,"text-3xl","font-semibold","mb-6"],[1,"w-full","max-w-sm",3,"submit"],[1,"block","text-gray-800","font-medium","mb-1"],["type","email","placeholder","ejemplo@tudominio.edu.pe",1,"text-sm","w-full","p-3","bg-gray-100","border","border-gray-300","focus:outline-blue-500","rounded-lg","mt-1","transition","duration-30","ease-in-out"],[1,"block","text-gray-800","font-medium","mt-4","mb-1"],["type","password","placeholder","\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",1,"text-sm","w-full","p-3","bg-gray-100","border","border-gray-300","focus:outline-blue-500","rounded-lg","mt-1","transition","duration-30","ease-in-out"],["for","csvFile",1,"block","text-gray-800","font-medium","mt-4","mb-1"],["id","csvFile","type","file","accept",".json",1,"text-sm","w-full","p-3","bg-gray-100","border","border-gray-300","rounded-lg","mt-1",3,"change"],[1,"w-sm","py-2.5","rounded-lg","mt-6",3,"disabled","ngClass"],[1,"flex","justify-between","items-center","mt-4"],[1,"flex","items-center"],["type","checkbox",1,"mr-2"],["href","#",1,"text-blue-500","hover:underline","transition","duration-300","ease-in-out"],["type","submit",1,"w-full","py-2.5","rounded-lg","mt-6",3,"click","disabled","ngClass"],[1,"mt-4","text-gray-600"],[1,"w-1/2","bg-blue-600","flex","flex-col","justify-center","text-white","p-10"],[1,"text-5xl","font-bold"],[1,"mt-6","max-w-2xl","text-left","text-gray-200","font-medium"],[1,"flex","items-center","space-x-2","mt-6"],[1,"flex","-space-x-2"],["src","https://i.ibb.co/Xr62XxKg/user1.jpg",1,"w-12","h-12","rounded-full","border-2","border-white"],["src","https://i.ibb.co/JRB3Hz6w/user2.jpg",1,"w-12","h-12","rounded-full","border-2","border-white"],["src","https://i.ibb.co/LzMgpkQ4/user3.jpg",1,"w-12","h-12","rounded-full","border-2","border-white"],["src","https://i.ibb.co/d43c28VC/user4.jpg",1,"w-12","h-12","rounded-full","border-2","border-white"],[1,"text-lg"]],template:function(n,o){n&1&&(t(0,"html",0)(1,"head"),s(2,"meta",1)(3,"meta",2),t(4,"title"),r(5,"Dashboard con Tabla"),i(),s(6,"link",3)(7,"link",4),i(),t(8,"body")(9,"div",5)(10,"div",6)(11,"h2",7),r(12,"Bienvenido de nuevo"),i(),t(13,"form",8),a("submit",function(m){return o.uploadCredentials(m)}),t(14,"label",9),r(15,"Email:"),i(),s(16,"input",10),t(17,"label",11),r(18,"Contrase\xF1a:"),i(),s(19,"input",12),t(20,"label",13),r(21,"Credenciales GCP:"),i(),t(22,"input",14),a("change",function(m){return o.onFileSelected(m)}),i(),t(23,"button",15),r(24," Subir Archivo "),i(),t(25,"div",16)(26,"label",17),s(27,"input",18),r(28," Recuerdame "),i(),t(29,"a",19),r(30," Olvidaste tu contrase\xF1a? "),i()(),t(31,"button",20),a("click",function(){return o.login()}),r(32," Inicia sesi\xF3n en tu cuenta "),i()(),t(33,"p",21),r(34," No tienes una cuenta? "),t(35,"a",19),r(36,"Registrate"),i()()(),t(37,"div",22)(38,"h1",23),r(39,"Optimiza la gesti\xF3n de tu colegio"),i(),t(40,"p",24),r(41," Miles de instituciones educativas organizan sus clases, alumnos y cursos con nuestra plataforma. Simplifica el registro de asistencia, centraliza la informaci\xF3n de cada estudiante y facilita la comunicaci\xF3n entre docentes y alumnos. "),i(),t(42,"div",25)(43,"div",26),s(44,"img",27)(45,"img",28)(46,"img",29)(47,"img",30),i(),t(48,"span",31),r(49,"Mas de "),t(50,"strong"),r(51,"50 "),i(),r(52,"colegios confian en nosotros"),i()()()()()()),n&2&&(p(23),b("disabled",!o.loginButton)("ngClass",f(4,_,o.loginButton,!o.loginButton)),p(8),b("disabled",o.loginButton)("ngClass",f(7,_,!o.loginButton,o.loginButton)))},dependencies:[C,E],styles:["body[_ngcontent-%COMP%]{font-family:Poppins,sans-serif;background-color:#fff}"]})};export{k as LoginComponent};
