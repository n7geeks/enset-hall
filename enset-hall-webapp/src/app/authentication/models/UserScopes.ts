export type Diploma = "engineering" | "dut" | "lep" | "master";
export type Role = "student" | "teacher" | "phd" | "external";
export type School = "enset" | "ensad";
export type Formation = "init" | "cont";
export type Major = "glsid" | "ii-bdcc" | "sdia" | "gecsi" | "gmsi" | "mrmi" | "gil" | "seer" | "eseg" | "fc" | "aoe";
export type Department = "math-info" | "genie-meca" | "genie-elect" | "genie-eco" | "staic";
export type Laboratory = "ssdia"
export interface UserScopes {
	department: Department;
	diploma: Diploma;
	laboratory: Laboratory;
	major: Major;
	promo: `${number}`;
	role: Role;
	school: School;
	formation: Formation;
}
