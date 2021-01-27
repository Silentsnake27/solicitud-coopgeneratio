// import os from 'os';
import request from 'request';
import 'regenerator-runtime/runtime';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import hbs from 'handlebars';
import path from 'path';
// import moment from 'moment';
import DataRegister from '../models/Data_register';
// import oficinas from '../models/oficinas';
// import nodemailer from 'nodemailer';
// import nuevoSocios from '../models/Nuevos_socios';
import mail from '../config/Email';
import dbsave from '../config/dbSave';

export async function SolicitudGerencial(req, res) {
    
    

}