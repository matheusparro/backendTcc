"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = void 0;
//Importaremos para realizar o Upload
const multer_1 = __importDefault(require("multer"));
//Ajudará no caminho para guardar nossa imagem
const path_1 = __importDefault(require("path"));
//Criara nossa pasta para armazenar nossos arquivos caso não exista
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
class UploadAvatar {
    constructor() {
        //Pasta para onde será feito o Upload
        this.URL = path_1.default.basename('upload');
    }
    //Methodo onde armazenaremos nossos arquivos
    storage() {
        /*
          Essa configuração irá nos ajudar
          1 - O destino do arquivo
          2 - E o nome do arquivo
        */
        return multer_1.default.diskStorage({
            //Criar o destino do arquivo
            destination: (req, file, cb) => {
                //Verifica se não existe o diretório
                if (!fs_1.default.existsSync(this.URL)) {
                    //Efetua a criação do diretório caso ele não exista
                    fs_1.default.mkdirSync(this.URL);
                }
                //Define o caminho da pasta
                cb(null, this.URL);
            },
            //Renomeia o arquivo
            filename: (req, file, cb) => {
                //Aqui vamos usar o mime-type para chegar o tipo do arquivo
                //E predefinir como ele veio até nosso sistema
                const type = mime_1.default.extension(file.mimetype);
                //Renomeia o nome do arquivo
                //Aqui temos o nome do arquivo gerado pelo Date
                //E colocamos a extensão dele de acordo com o mime-type
                cb(null, `${new Date().getTime()}.${type}`);
            },
        });
    }
    //Methodo onde iremos efetuar o filtro de arquivos
    //Se é valido ou não
    fileFilter() {
        /*
          Essa configuração vai nos ajudar com
          1 - A validação do arquivo
        */
        return (req, file, cb) => {
            //Utilizaremos a Lib mime-types para identificar o tipo do arquivo
            const type = mime_1.default.extension(file.mimetype);
            /*
              Este array será montado a conditions de validação
              No caso aceitará apenas imagens como "png", "jpg", "jpeg"
            */
            const conditions = ["png", "jpg", "jpeg"];
            //Perguntamos se existe algum desses valores no type
            if (conditions.includes(`${type}`)) {
                //Caso exista, teremos nossa imagem linda maravilhosa
                cb(null, true);
            }
            //Caso não de certo a validação não efetuaremos o upload
            cb(null, false);
        };
    }
    //Configuração que usaremos em nossas rotas como Middleware
    get getConfig() {
        /*
          Essa configuração vai nos ajudar com
          1 - A compor as configs do Multer como Middleware em nossas rotas
          2 - Não será um middleware global e sim para usos unicos e comportamentais
        */
        return {
            //Storage serve para compor a config do multer destination e filename
            storage: this.storage(),
            //FileFilter serve para validar o filtro de arquivos
            fileFilter: (req, file, cb) => {
                const allowedMimes = [
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png",
                    "image/gif"
                ];
                if (allowedMimes.includes(file.mimetype)) {
                    cb(null, true);
                }
                else {
                    cb(new Error("Invalid file type."));
                }
            }
        };
    }
}
exports.uploadAvatar = new UploadAvatar();
