export class CreateEmpresaDto {
  vch_nomemp!:        string;
  vch_cgcemp!:        string;
  vch_insestemp!:     string;
  int_codstaemp!:     number;
  int_codati!:        number;
  int_codcid!:        number;
  chr_codmtzfilemp!:  string;
  chr_vldbcoemp!:     string;

  vch_nomfntemp?:     string;
  chr_cepemp?:        string;
  chr_estemp?:        string;
  vch_cidemp?:        string;
  vch_baiemp?:        string;
  vch_endemp?:        string;
  int_numendemp?:     number;
  vch_cplendemp?:     string;
  vch_tlfemp?:        string;
  vch_faxemp?:        string;
  vch_obsemp?:        string;
  vch_nomctoemp?:     string;
  int_codempmtzemp?:  number;

  // Tributação
  dec_alqissemp?:           number;
  dec_alqpisemp?:           number;
  dec_alqcrbfnmsegsocemp?:  number;
  dec_alqimprndemp?:        number;
  dec_alqcrbsocemp?:        number;
  dec_alqinunacsegsocemp?:  number;
  dec_alqsmpnacemp?:        number;
  vch_insmncemp?:           string;
  int_codrgmtbtemp?:        string;

  // Sintegra / NF
  chr_codopeemp?:     string;
  chr_modnotfscemp?:  string;
  vch_sernotfscemp?:  string;
  tin_codidtettarqmgnemp?:  number;
  tin_codidtnatopeemp?:     number;
  tin_codfniaprarqmgnemp?:  number;
}
