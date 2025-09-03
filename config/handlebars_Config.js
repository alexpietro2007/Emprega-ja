//A)Importando módulos externos.
    //1.Importa o Express-Handlebars.
    import exphbs from "express-handlebars";
    //2.Importa o Core Module "Path" -> "Caminho".
    import path from "path";
    //3.Importa o método "fileURLToPath" -> "URL do arquivo para caminho" do Core Module "Url".
    import { fileURLToPath } from "url";


/*
-------------------------------------------------------------------------------
B)Configurações dos caminhos para encontrar os arquivos.

const _filename -> "Nome do Arquivo"
const _dirname -> "Nome da Pasta"
-------------------------------------------------------------------------------
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Função que vai exportar para o servidor(server.js) as configurações do Handlebars.
export function handlebars_Config(app) {
    
    const hbs = exphbs.create({
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "../views/layouts"),
      partialsDir: path.join(__dirname, "../views/partials"),
      extname: ".handlebars"
    });
  
    app.engine("handlebars", hbs.engine);
    app.set("view engine", "handlebars");
    app.set("views", path.join(__dirname, "../views"));
}