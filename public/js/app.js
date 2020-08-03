import {auth} from './Auth.js'
import {album} from './Album.js'

const app = angular.module('CardAlbum', []);

app.controller('AuthController', auth );
app.controller('AlbumController', album);