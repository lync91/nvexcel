const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dinhmucSchema = new Schema({
  MHDM: String,
  MSVT: String,
  HPVT: Number,
  LVT: String,
  GC: String,
  MDM: String,
  DM: String,
  KV: String,
});
mongoose.model("dinhmuc", dinhmucSchema);
const dongiaSchema = new Schema({
  MHDG: String,
  TCV: String,
  DVT: String,
  VLC: Number,
  VLP: Number,
  NC: Number,
  MTC: Number,
  MHDM: String,
  PLV: String,
  TK: String,
  DM: String,
  KV: String,
});
dongiaSchema.index({ TCV: "text", KV: "text", DM: "text" });
mongoose.model("dongia", dongiaSchema);

const giacamaySchema = new Schema({
  MH: String,
  LM_TB: String,
  SC: Number,
  DMKH: Number,
  HSTH: Number,
  DMSC: Number,
  DMCP: Number,
  DMTH: String,
  LNL: String,
  HSNL: String,
  TPCB: String,
  CPKH: Number,
  CPSC: Number,
  CPK: Number,
  CPNL: Number,
  CPTL: Number,
  GCM: Number,
  NGG: Number,
  NGDC: Number,
  LTDKM: String,
  CTNL: String,
  DM: String,
  KV: String,
});
mongoose.model("giacamay", giacamaySchema);

const phulucvuaSchema = new Schema({
  BTM: String,
  TG: String,
  DVT: String,
  MXM: String,
  HPXM: Number,
  CAT: String,
  HPC: Number,
  DA: String,
  HPD: Number,
  VCUC: String,
  HPV: Number,
  MA1: String,
  HP1: Number,
  MA2: String,
  HP2: Number,
  MA3: String,
  HP3: Number,
  MA4: String,
  HP4: Number,
  DM: String,
  KV: String,
});
mongoose.model("phulucvua", phulucvuaSchema);

const tudienvattuSchema = new Schema({
  MSVT: String,
  TVT: String,
  DVT: String,
  GG: Number,
  LVT: String,
  TLG: Number,
  HSBH: Number,
  DM: String,
  KV: String,
});
mongoose.model("tudienvattu", tudienvattuSchema);
