"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nimbyMode_1 = __importDefault(require("./nimbyMode"));
class ManualMode extends nimbyMode_1.default {
    constructor() {
        super(...arguments);
        this.name = "manual";
    }
}
exports.default = new ManualMode();
