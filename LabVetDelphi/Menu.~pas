unit Menu;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, Buttons, ExtCtrls, Menus, Winsock, jpeg, ComCtrls, DB, RxQuery,
  DBTables, users_basic, users_cs;

type
  TFrmMenu = class(TForm)
    MainMenu1: TMainMenu;
    Cadastro1: TMenuItem;
    ParametrosdosExames1: TMenuItem;
    Espcie1: TMenuItem;
    Exame1: TMenuItem;
    Profissionais1: TMenuItem;
    Conselho1: TMenuItem;
    ProfissionaisSolicitantes1: TMenuItem;
    ProfissionaisInternosLiberaodosLaudos1: TMenuItem;
    Cliente1: TMenuItem;
    Movimentos1: TMenuItem;
    Pedidos1: TMenuItem;
    ResultadosExamesdosPedidos1: TMenuItem;
    Relatrios1: TMenuItem;
    ExamesLiberados1: TMenuItem;
    Faturamento1: TMenuItem;
    Utilitrios1: TMenuItem;
    Administrador1: TMenuItem;
    MudaSenha1: TMenuItem;
    CadastrodaEmpresa1: TMenuItem;
    Sair1: TMenuItem;
    Panel1: TPanel;
    Panel2: TPanel;
    SpeedButton4: TSpeedButton;
    SpeedButton6: TSpeedButton;
    StatusBar1: TStatusBar;
    ScrollBox1: TScrollBox;
    Image1: TImage;
    PageControl1: TPageControl;
    TSLaboratorio: TTabSheet;
    TSFinanceiro: TTabSheet;
    SBBanco: TSpeedButton;
    SBVeterinario: TSpeedButton;
    SBClientes: TSpeedButton;
    SpeedButton2: TSpeedButton;
    SBRetirada: TSpeedButton;
    SBRetirado: TSpeedButton;
    SpeedButton3: TSpeedButton;
    SpeedButton5: TSpeedButton;
    TabSheet1: TTabSheet;
    SBFornecedor: TSpeedButton;
    QryTables: TQuery;
    QrySP: TQuery;
    QrySPSPECIFIC_CATALOG: TStringField;
    QrySPSPECIFIC_SCHEMA: TStringField;
    QrySPSPECIFIC_NAME: TStringField;
    QrySPORDINAL_POSITION: TIntegerField;
    QrySPPARAMETER_MODE: TStringField;
    QrySPIS_RESULT: TStringField;
    QrySPAS_LOCATOR: TStringField;
    QrySPPARAMETER_NAME: TStringField;
    QrySPDATA_TYPE: TStringField;
    QrySPCHARACTER_MAXIMUM_LENGTH: TIntegerField;
    QrySPCHARACTER_OCTET_LENGTH: TIntegerField;
    QrySPCOLLATION_CATALOG: TStringField;
    QrySPCOLLATION_SCHEMA: TStringField;
    QrySPCOLLATION_NAME: TStringField;
    QrySPCHARACTER_SET_CATALOG: TStringField;
    QrySPCHARACTER_SET_SCHEMA: TStringField;
    QrySPCHARACTER_SET_NAME: TStringField;
    QrySPNUMERIC_PRECISION: TSmallintField;
    QrySPNUMERIC_PRECISION_RADIX: TSmallintField;
    QrySPNUMERIC_SCALE: TIntegerField;
    QrySPDATETIME_PRECISION: TSmallintField;
    QrySPINTERVAL_TYPE: TStringField;
    QrySPINTERVAL_PRECISION: TSmallintField;
    QrySPUSER_DEFINED_TYPE_CATALOG: TStringField;
    QrySPUSER_DEFINED_TYPE_SCHEMA: TStringField;
    QrySPUSER_DEFINED_TYPE_NAME: TStringField;
    QrySPSCOPE_CATALOG: TStringField;
    QrySPSCOPE_SCHEMA: TStringField;
    QrySPSCOPE_NAME: TStringField;
    QryTablesTABLE_CATALOG: TStringField;
    QryTablesTABLE_SCHEMA: TStringField;
    QryTablesTABLE_NAME: TStringField;
    QryTablesCOLUMN_NAME: TStringField;
    QryTablesORDINAL_POSITION: TIntegerField;
    QryTablesCOLUMN_DEFAULT: TStringField;
    QryTablesIS_NULLABLE: TStringField;
    QryTablesDATA_TYPE: TStringField;
    QryTablesCHARACTER_MAXIMUM_LENGTH: TIntegerField;
    QryTablesCHARACTER_OCTET_LENGTH: TIntegerField;
    QryTablesNUMERIC_PRECISION: TSmallintField;
    QryTablesNUMERIC_PRECISION_RADIX: TSmallintField;
    QryTablesNUMERIC_SCALE: TIntegerField;
    QryTablesDATETIME_PRECISION: TSmallintField;
    QryTablesCHARACTER_SET_CATALOG: TStringField;
    QryTablesCHARACTER_SET_SCHEMA: TStringField;
    QryTablesCHARACTER_SET_NAME: TStringField;
    QryTablesCOLLATION_CATALOG: TStringField;
    QryTablesCOLLATION_SCHEMA: TStringField;
    QryTablesCOLLATION_NAME: TStringField;
    QryTablesDOMAIN_CATALOG: TStringField;
    QryTablesDOMAIN_SCHEMA: TStringField;
    QryTablesDOMAIN_NAME: TStringField;
    SQLScript1: TSQLScript;
    QRYSPNOME: TQuery;
    QRYSPNOMESPECIFIC_CATALOG: TStringField;
    QRYSPNOMESPECIFIC_SCHEMA: TStringField;
    QRYSPNOMESPECIFIC_NAME: TStringField;
    QRYSPNOMEROUTINE_CATALOG: TStringField;
    QRYSPNOMEROUTINE_SCHEMA: TStringField;
    QRYSPNOMEROUTINE_NAME: TStringField;
    QRYSPNOMEROUTINE_TYPE: TStringField;
    QRYSPNOMEMODULE_CATALOG: TStringField;
    QRYSPNOMEMODULE_SCHEMA: TStringField;
    QRYSPNOMEMODULE_NAME: TStringField;
    QRYSPNOMEUDT_CATALOG: TStringField;
    QRYSPNOMEUDT_SCHEMA: TStringField;
    QRYSPNOMEUDT_NAME: TStringField;
    QRYSPNOMEDATA_TYPE: TStringField;
    QRYSPNOMECHARACTER_MAXIMUM_LENGTH: TIntegerField;
    QRYSPNOMECHARACTER_OCTET_LENGTH: TIntegerField;
    QRYSPNOMECOLLATION_CATALOG: TStringField;
    QRYSPNOMECOLLATION_SCHEMA: TStringField;
    QRYSPNOMECOLLATION_NAME: TStringField;
    QRYSPNOMECHARACTER_SET_CATALOG: TStringField;
    QRYSPNOMECHARACTER_SET_SCHEMA: TStringField;
    QRYSPNOMECHARACTER_SET_NAME: TStringField;
    QRYSPNOMENUMERIC_PRECISION: TSmallintField;
    QRYSPNOMENUMERIC_PRECISION_RADIX: TSmallintField;
    QRYSPNOMENUMERIC_SCALE: TIntegerField;
    QRYSPNOMEDATETIME_PRECISION: TSmallintField;
    QRYSPNOMEINTERVAL_TYPE: TStringField;
    QRYSPNOMEINTERVAL_PRECISION: TSmallintField;
    QRYSPNOMETYPE_UDT_CATALOG: TStringField;
    QRYSPNOMETYPE_UDT_SCHEMA: TStringField;
    QRYSPNOMETYPE_UDT_NAME: TStringField;
    QRYSPNOMESCOPE_CATALOG: TStringField;
    QRYSPNOMESCOPE_SCHEMA: TStringField;
    QRYSPNOMESCOPE_NAME: TStringField;
    QRYSPNOMEMAXIMUM_CARDINALITY: TFloatField;
    QRYSPNOMEDTD_IDENTIFIER: TStringField;
    QRYSPNOMEROUTINE_BODY: TStringField;
    QRYSPNOMEROUTINE_DEFINITION: TStringField;
    QRYSPNOMEEXTERNAL_NAME: TStringField;
    QRYSPNOMEEXTERNAL_LANGUAGE: TStringField;
    QRYSPNOMEPARAMETER_STYLE: TStringField;
    QRYSPNOMEIS_DETERMINISTIC: TStringField;
    QRYSPNOMESQL_DATA_ACCESS: TStringField;
    QRYSPNOMEIS_NULL_CALL: TStringField;
    QRYSPNOMESQL_PATH: TStringField;
    QRYSPNOMESCHEMA_LEVEL_ROUTINE: TStringField;
    QRYSPNOMEMAX_DYNAMIC_RESULT_SETS: TSmallintField;
    QRYSPNOMEIS_USER_DEFINED_CAST: TStringField;
    QRYSPNOMEIS_IMPLICITLY_INVOCABLE: TStringField;
    QRYSPNOMECREATED: TDateTimeField;
    QRYSPNOMELAST_ALTERED: TDateTimeField;
    SPPendentes: TSpeedButton;
    QryFK: TQuery;
    QryFKTABLE_CATALOG: TStringField;
    QryFKTABLE_SCHEMA: TStringField;
    QryFKTABLE_NAME: TStringField;
    QryFKCOLUMN_NAME: TStringField;
    QryFKCONSTRAINT_CATALOG: TStringField;
    QryFKCONSTRAINT_SCHEMA: TStringField;
    QryFKCONSTRAINT_NAME: TStringField;
    Backup1: TMenuItem;
    UsersCS1: TUsersCS;
    UsersCSReg1: TUsersCSReg;
    SBDesconto: TSpeedButton;
    SBFechamento: TSpeedButton;
    SpeedButton1: TSpeedButton;
    SBContas: TSpeedButton;
    SBTransfere: TSpeedButton;
    SBExtratoPedido: TSpeedButton;
    SBRelDescontos: TSpeedButton;
    procedure Conselho1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure SpeedButton4Click(Sender: TObject);
    procedure CadastrodaEmpresa1Click(Sender: TObject);
    procedure ProfissionaisSolicitantes1Click(Sender: TObject);
    procedure ProfissionaisInternosLiberaodosLaudos1Click(Sender: TObject);
    procedure Clientes1Click(Sender: TObject);
    procedure SBClientesClick(Sender: TObject);
    procedure Animais1Click(Sender: TObject);
    procedure Espcie1Click(Sender: TObject);
    procedure Exame1Click(Sender: TObject);
    procedure Pedidos1Click(Sender: TObject);
    procedure SpeedButton2Click(Sender: TObject);
    procedure SpeedButton3Click(Sender: TObject);
    procedure SBRetiradaClick(Sender: TObject);
    procedure SBRetiradoClick(Sender: TObject);
    procedure SpeedButton5Click(Sender: TObject);
    procedure SBBancoClick(Sender: TObject);
    procedure Cliente1Click(Sender: TObject);
    procedure SBVeterinarioClick(Sender: TObject);
    procedure SBFornecedorClick(Sender: TObject);
    procedure SBFechamentoClick(Sender: TObject);
    procedure SBContasClick(Sender: TObject);
    procedure SPPendentesClick(Sender: TObject);
    procedure SpeedButton1Click(Sender: TObject);
    procedure Backup1Click(Sender: TObject);
    procedure Administrador1Click(Sender: TObject);
    procedure SBDescontoClick(Sender: TObject);
    procedure SBTransfereClick(Sender: TObject);
    procedure SBExtratoPedidoClick(Sender: TObject);
    procedure SBRelDescontosClick(Sender: TObject);

  private
    { Private declarations }

  public
    { Public declarations }

  end;

var
  FrmMenu: TFrmMenu;



implementation

uses Conselho, DM_LABVET, Empresa, ProfSolicitante, ProfLaudo, Clientes,
  Animais, Especie, ExamesParametros, Pedido, FTP, Laudo, RetiraPedido,
  Banco, Fornecedor, Fechamento, Contas, Pendente, Cobranca, Backup,
  Desconto, Transferencia, ExtratoPedidos;

{$R *.dfm}



procedure TFrmMenu.Conselho1Click(Sender: TObject);
begin
   IF FrmConselho = nil then
      FrmConselho := TFrmConselho.create(Self);
   FrmConselho.ShowModal;
end;

procedure TFrmMenu.FormCreate(Sender: TObject);
begin
//   IF FrmFtp = nil then
//      FrmFtp := TFrmFtp.Create(Self);
//   FrmFtp.ShowModal;

    IF not DMLABVET.DBLABVET.Connected then
       DMLabVet.DBLABVET.Connected := True;
    DMLabVet.QryEmpresa.Active := True;
    IF DMLabVet.QryEmpresa.Eof then
    begin
       DMLabVet.QryEmpresa.Insert;
       IF FrmEmpresa = nil then
          FrmEmpresa := TFrmEmpresa.create(Self);
       FrmEmpresa.Showmodal;
    end;
    PageControl1.ActivePage := TSLaboratorio;
    SBContas.Caption := 'Contas'+#13+'Pagar e Receber';
    //////////////////////////////////////////////////
    /////// Faz Alteração no BANCO DE DADOS - SP - VIEW
    ////////////////////////////////////////////////////
    QryTables.Close;
    QryTables.Active := True;
    QrySP.close;
    QrySP.Active := True;
    QrySPNOME.Close;
    QrySPNome.Active := True;
    QRYFk.Close;
    QRYFK.Active := True;
    // Testa e Cria SP_BACKUP caso não Exista
    IF not QrySPNome.Locate('SPECIFIC_NAME','SP_BACKUP',[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' CREATE  PROCEDURE [dbo].[SP_BACKUP] ');
       SqlScript1.SQL.Add(' AS ');
       SqlScript1.SQL.Add('   SET NOCOUNT ON ');
       SqlScript1.SQL.Add('   DECLARE @_Error INT ');
       SqlScript1.SQL.Add('   DECLARE @DiaSemana char(1) ');
       SqlScript1.SQL.Add('   Declare @ano char(4) ');
       SqlScript1.SQL.Add('   DECLARE @LOCAL VARCHAR(40) ');
       SqlScript1.SQL.Add(' Select @DiaSemana = cast(DATEPART(dw,GETDATE()) as char(1)) ');
       SqlScript1.SQL.Add(' SELECT @ANO = CAST(YEAR(GETDATE()) as CHAR(4)) ');
       SqlScript1.SQL.Add(' SELECT @LOCAL = ''C:\AGUIA\DATABASE\LABVET\BK_LABVET+@DIASEMANA+@ANO+.bak''');
       SqlScript1.SQL.Add(' BACKUP DATABASE LABVET ');
       SqlScript1.SQL.Add('  TO DISK = @LOCAL ');
       SqlScript1.SQL.Add('    WITH FORMAT ');
       SqlScript1.SQL.Add(' SELECT @_Error = @@ERROR ');
       SqlScript1.SQL.Add(' RETURN @_Error ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;
///////
    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['CONTAS','CodRespProf']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[Contas] ');
       SqlScript1.SQL.Add( '  ADD CodRespProf Integer NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;


    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['ExamesItensParam','Formula']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ExamesItensParam] ');
       SqlScript1.SQL.Add( '  ADD Formula char (1) NULL ');
       SqlScript1.ExecSQL;

       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ExamesItensParam] ');
       SqlScript1.SQL.Add( '  ADD OrigemCalculo char (1) NULL ');
       SqlScript1.ExecSQL;

       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ExamesItensParam] ');
       SqlScript1.SQL.Add( '  ADD CodPai integer NULL ');
       SqlScript1.ExecSQL;

       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ExamesItensParam] ');
       SqlScript1.SQL.Add( '  ADD PercFormula numeric (5,2) NULL ');
       SqlScript1.ExecSQL;
    end;

    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['MovItensExames','Formula']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[MovItensExames] ');
       SqlScript1.SQL.Add( '  ADD Formula char (1) NULL ');
       SqlScript1.ExecSQL;

       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[MovItensExames] ');
       SqlScript1.SQL.Add( '  ADD OrigemCalculo char (1) NULL ');
       SqlScript1.ExecSQL;

       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[MovItensExames] ');
       SqlScript1.SQL.Add( '  ADD CodPai integer NULL ');
       SqlScript1.ExecSQL;

       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[MovItensExames] ');
       SqlScript1.SQL.Add( '  ADD PercFormula numeric (5,2) NULL ');
       SqlScript1.ExecSQL;
    end;



    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['DESCONTO','CODDESCONTO']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' CREATE TAble [Dbo].[DESCONTO] ');
       SqlScript1.SQL.Add( ' (   CODDESCONTO Integer IDENTITY(1,1) NOT NULL, ');
       SqlScript1.SQL.Add( '     Nome   char(40) NULL, ');
       SqlScript1.SQL.Add( '     ValorInicial numeric (18,2) NULL, ');
       SqlScript1.SQL.Add( '     ValorFinal numeric (18,2) NULL, ');
       SqlScript1.SQL.Add( '     Desconto numeric (18,2) NULL, ');
       SqlScript1.SQL.Add( '     Ativo char(1) null ');
       SqlScript1.SQL.Add( '  ');
       SqlScript1.SQL.Add( ' CONSTRAINT [PK_DESCONTO] PRIMARY KEY CLUSTERED ');
       SqlScript1.SQL.Add( ' (  ');
       SqlScript1.SQL.Add( '	[CODDESCONTO] ASC ');
       SqlScript1.SQL.Add( ' )WITH (PAD_INDEX  = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY] ');
       SqlScript1.SQL.Add( ' ) ON [PRIMARY] ');
//       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;



    end;


    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['ExamesItensParam','CasasDecimais1']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ExamesItensPAram] ');
       SqlScript1.SQL.Add( '  ADD CasasDecimais1 Integer NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;
    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['ExamesItensParam','CasasDecimais2']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ExamesItensPAram] ');
       SqlScript1.SQL.Add( '  ADD CasasDecimais2 Integer NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;
    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['ExamesItensParam','TipoCampo2']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ExamesItensPAram] ');
       SqlScript1.SQL.Add( '  ADD TipoCampo2 char(1) NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;
////////
    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['MovItensExames','CasasDecimais1']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[MovItensExames] ');
       SqlScript1.SQL.Add( '  ADD CasasDecimais1 Integer NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;
    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['MovItensExames','CasasDecimais2']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[MovItensExames] ');
       SqlScript1.SQL.Add( '  ADD CasasDecimais2 Integer NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;
    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['MovItensExames','TipoCampo2']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[MovItensExames] ');
       SqlScript1.SQL.Add( '  ADD TipoCampo2 char(1) NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;

    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['MovPedido','Raca']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[MOVPEDIDO] ');
       SqlScript1.SQL.Add( '  ADD Raca varchar(15) NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;

    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['ProfissionalLaudo','Funcao']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ProfissionalLaudo] ');
       SqlScript1.SQL.Add( '  ADD Funcao varchar(30) NULL ');
       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;

    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['ProfissionalLaudo','Mensagem_Qualidade']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[ProfissionalLaudo] ');
       SqlScript1.SQL.Add( '  ADD Mensagem_Qualidade char(1) NULL ');
//       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;


    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['CONTAS','CODDESCONTO']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' Alter TAble [Dbo].[CONTAS] ');
       SqlScript1.SQL.Add( '  ADD CODDESCONTO INTEGER NULL ');
//       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;


    IF not QrySP.Locate('SPECIFIC_NAME;PARAMETER_NAME',VarArrayOf(['SP_Insert_MovItensExames','@CasasDecimais1_19']),[]) then
    begin
       IF QrySPNOME.Locate('SPECIFIC_NAME','SP_Insert_MovItensExames',[]) then
       begin
          SqlScript1.SQL.Clear;
          SqlScript1.SQL.Add(' DROP PROCEDURE SP_Insert_MovItensExames ');
          ShowMessage(SqlScript1.SQL.Text);
          SqlScript1.ExecSQL;
       end;
////// Recria a Procedure
       SqlScript1.SQL.Clear;
//       SqlScript1.SQL.Add(' set ANSI_NULLS ON ');
//       SqlScript1.SQL.Add(' set QUOTED_IDENTIFIER ON ');
//       SqlScript1.SQL.Add('                                                       ');
       SqlScript1.SQL.Add(' CREATE PROCEDURE [dbo].[SP_Insert_MovItensExames]     ');
       SqlScript1.SQL.Add(' 	(@CodMovItensExames_1 	[int] output,               ');
       SqlScript1.SQL.Add(' 	 @CodMovExames_2 	[int],                            ');
       SqlScript1.SQL.Add(' 	 @CodExame_3 	[int],                                ');
       SqlScript1.SQL.Add(' 	 @CodItensExame_4 	[int],                          ');
       SqlScript1.SQL.Add(' 	 @Resultado1_5 	[numeric] (18,4),                   ');
       SqlScript1.SQL.Add(' 	 @Resultado2_6 	[numeric] (18,4),                   ');
       SqlScript1.SQL.Add(' 	 @ResultadoTexto_7 	[Text],                         ');
       SqlScript1.SQL.Add(' 	 @OrdemApresentacao_8 	[int],                      ');
       SqlScript1.SQL.Add(' 	 @NomeItemExame_9 	[varchar](30),                  ');
       SqlScript1.SQL.Add(' 	 @Referencia1_10 	[varchar] (15),                   ');
       SqlScript1.SQL.Add('      @Referencia2_11 	[varchar] (15),                 ');
       SqlScript1.SQL.Add(' 	 @Unidade1_12 	[varchar] (15),                     ');
       SqlScript1.SQL.Add(' 	 @DigitaCampo_13 	[char](1),                        ');
       SqlScript1.SQL.Add('      @Obrigatorio_14 	[char](1),                      ');
       SqlScript1.SQL.Add(' 	 @TipoCampo_15 	[char](1),                          ');
       SqlScript1.SQL.Add('      @Maximo_16     [numeric] (18,4),                 ');
       SqlScript1.SQL.Add(' 	 @Minimo_17 	[numeric](18,4),                      ');
       SqlScript1.SQL.Add(' 	 @Unidade2_18 	[varchar] (15),                      ');
       SqlScript1.SQL.Add(' 	 @CasasDecimais1_19 	[integer],                     ');
       SqlScript1.SQL.Add(' 	 @CasasDecimais2_20 	[integer],                     ');
       SqlScript1.SQL.Add(' 	 @TipoCampo2_21 	[char] (1)                      ');

       SqlScript1.SQL.Add('                                                       ');
       SqlScript1.SQL.Add(' )                                                     ');
       SqlScript1.SQL.Add('                                                       ');
       SqlScript1.SQL.Add(' AS                                                    ');
       SqlScript1.SQL.Add(' Begin                                                 ');
       SqlScript1.SQL.Add(' INSERT INTO [MovItensExames]                          ');
       SqlScript1.SQL.Add('                                                       ');
       SqlScript1.SQL.Add(' 	(                                                   ');
       SqlScript1.SQL.Add(' 	 CodMovExames,                                      ');
       SqlScript1.SQL.Add(' 	 CodExame,                                          ');
       SqlScript1.SQL.Add(' 	 CodItensExame,                                     ');
       SqlScript1.SQL.Add(' 	 Resultado1,                                        ');
       SqlScript1.SQL.Add(' 	 Resultado2,                                        ');
       SqlScript1.SQL.Add(' 	 ResultadoTexto,                                    ');
       SqlScript1.SQL.Add(' 	 OrdemApresentacao,                                 ');
       SqlScript1.SQL.Add(' 	 NomeItemExame,                                     ');
       SqlScript1.SQL.Add(' 	 Referencia1,                                       ');
       SqlScript1.SQL.Add('      Referencia2,                                     ');
       SqlScript1.SQL.Add(' 	 Unidade1,                                          ');
       SqlScript1.SQL.Add('      Unidade2,                                        ');
       SqlScript1.SQL.Add(' 	 DigitaCampo,                                       ');
       SqlScript1.SQL.Add('      Obrigatorio,                                     ');
       SqlScript1.SQL.Add(' 	 TipoCampo,                                         ');
       SqlScript1.SQL.Add('      Maximo,                                          ');
       SqlScript1.SQL.Add(' 	 Minimo,                                             ');
       SqlScript1.SQL.Add(' 	 CasasDecimais1,                     ');
       SqlScript1.SQL.Add(' 	 CasasDecimais2,                     ');
       SqlScript1.SQL.Add(' 	 TipoCampo2                      ');

       SqlScript1.SQL.Add(' )                                                     ');
       SqlScript1.SQL.Add('                                                       ');
       SqlScript1.SQL.Add(' VALUES                                                ');
       SqlScript1.SQL.Add('                                                       ');
       SqlScript1.SQL.Add(' 	(                                                   ');
       SqlScript1.SQL.Add(' 	 @CodMovExames_2,                                   ');
       SqlScript1.SQL.Add(' 	 @CodExame_3,                                       ');
       SqlScript1.SQL.Add(' 	 @CodItensExame_4,                                  ');
       SqlScript1.SQL.Add(' 	 @Resultado1_5,                                     ');
       SqlScript1.SQL.Add(' 	 @Resultado2_6,                                     ');
       SqlScript1.SQL.Add(' 	 @ResultadoTexto_7,                                 ');
       SqlScript1.SQL.Add(' 	 @OrdemApresentacao_8,                              ');
       SqlScript1.SQL.Add(' 	 @NomeItemExame_9,                                  ');
       SqlScript1.SQL.Add(' 	 @Referencia1_10,                                   ');
       SqlScript1.SQL.Add('      @Referencia2_11,                                 ');
       SqlScript1.SQL.Add(' 	 @Unidade1_12,                                      ');
       SqlScript1.SQL.Add('      @unidade2_18,                                    ');
       SqlScript1.SQL.Add(' 	 @DigitaCampo_13,                                   ');
       SqlScript1.SQL.Add('      @Obrigatorio_14,                                 ');
       SqlScript1.SQL.Add(' 	 @TipoCampo_15,                                     ');
       SqlScript1.SQL.Add('      @Maximo_16,                                      ');
       SqlScript1.SQL.Add(' 	 @Minimo_17,                                         ');
       SqlScript1.SQL.Add(' 	 @CasasDecimais1_19,                   ');
       SqlScript1.SQL.Add(' 	 @CasasDecimais2_20,                  ');
       SqlScript1.SQL.Add(' 	 @TipoCampo2_21                   ');

       SqlScript1.SQL.Add('                                                       ');
       SqlScript1.SQL.Add(' )                                                     ');
       SqlScript1.SQL.Add(' set @CodMovItensExames_1 = @@identity                 ');
       SqlScript1.SQL.Add(' END                                                   ');
       SqlScript1.SQL.Add(' ');
//       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;




   end;
//// Criação do SP_INSERT_EXAMES

   IF not QrySPNOME.Locate('SPECIFIC_NAME','SP_Insert_Exames',[]) then
   begin
 ///// Recria a Procedure
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add(' CREATE PROCEDURE [dbo].[SP_Insert_Exames] ');
	     SqlScript1.SQL.Add(' (                                        ');
       SqlScript1.SQL.Add(' @CodExame_3 	[int] output,               ');
       SqlScript1.SQL.Add(' @Valor_5 	[numeric] (18,4),                ');
       SqlScript1.SQL.Add(' @CodEspecie_6 	[int],                      ');
       SqlScript1.SQL.Add(' @NomeExame_7 	[varchar](50),                ');
       SqlScript1.SQL.Add(' @NomeExameReduz_8 	[char] (10),            ');
       SqlScript1.SQL.Add(' 	 @Dias_Elaboracao_Exame_9 	[int],        ');
       SqlScript1.SQL.Add(' 	 @ImprimirSeparado_10 	[char](1),        ');
       SqlScript1.SQL.Add(' 	 @Metodo_11 	[varchar](20),               ');
       SqlScript1.SQL.Add(' 	 @Material_12 	[varchar](50)             ');
       SqlScript1.SQL.Add(' )                                            ');
       SqlScript1.SQL.Add(' AS                                           ');
       SqlScript1.SQL.Add(' Begin                                         ');
       SqlScript1.SQL.Add(' INSERT INTO [Exames]                          ');
       SqlScript1.SQL.Add(' 	(                                           ');
       SqlScript1.SQL.Add(' 	 Valor,                                     ');
       SqlScript1.SQL.Add(' 	 CodEspecie,                                ');
       SqlScript1.SQL.Add(' 	 NomeExame,                                 ');
       SqlScript1.SQL.Add(' 	 NomeExameReduz,                            ');
       SqlScript1.SQL.Add(' 	 Dias_Elaboracao_Exame,                     ');
       SqlScript1.SQL.Add(' 	 ImprimirSeparado,                          ');
       SqlScript1.SQL.Add(' 	 Metodo,                                    ');
       SqlScript1.SQL.Add(' 	 Material                                   ');
       SqlScript1.SQL.Add(' )                                              ');
       SqlScript1.SQL.Add(' VALUES                                         ');
       SqlScript1.SQL.Add(' 	(                                            ');
       SqlScript1.SQL.Add(' 	 @Valor_5 	,                                ');
       SqlScript1.SQL.Add(' 	 @CodEspecie_6 	,                            ');
       SqlScript1.SQL.Add(' 	 @NomeExame_7 	,                             ');
       SqlScript1.SQL.Add(' 	 @NomeExameReduz_8 	,                        ');
       SqlScript1.SQL.Add(' 	 @Dias_Elaboracao_Exame_9 	,                 ');
       SqlScript1.SQL.Add(' 	 @ImprimirSeparado_10 	,                     ');
       SqlScript1.SQL.Add(' 	 @Metodo_11 	,                               ');
       SqlScript1.SQL.Add(' 	 @Material_12                                 ');
       SqlScript1.SQL.Add(' )                                               ');
       SqlScript1.SQL.Add(' set @CodExame_3 = @@identity                     ');
       SqlScript1.SQL.Add(' END                                              ');
       SqlScript1.SQL.Add(' ');
       SqlScript1.ExecSQL;
   end;




//////// INSERT SP_INSERT_EXAMESITENSPARAM
   IF not QrySPNOME.Locate('SPECIFIC_NAME','SP_Insert_ExamesItensPAram',[]) then
   begin
       SqlScript1.SQL.Add(' CREATE PROCEDURE [dbo].[SP_Insert_ExamesItensPAram] ');
       SqlScript1.SQL.Add(' (                                                   ');
       SqlScript1.SQL.Add(' @CodExame_3 	[int],                                ');
       SqlScript1.SQL.Add(' @OrdemApresentacao_8 	[int],                        ');
       SqlScript1.SQL.Add(' @NomeItemExame_9 	[varchar](30),                    ');
       SqlScript1.SQL.Add(' @Referencia1_10 	[varchar] (15),                   ');
       SqlScript1.SQL.Add(' @Referencia2_11 	[varchar] (15),                   ');
       SqlScript1.SQL.Add(' @Unidade1_12 	[varchar] (15),                       ');
       SqlScript1.SQL.Add(' @DigitaCampo_13 	[char](1),                        ');
       SqlScript1.SQL.Add(' @Obrigatorio_14 	[char](1),                        ');
       SqlScript1.SQL.Add(' @TipoCampo_15 	[char](1),                          ');
       SqlScript1.SQL.Add(' @Maximo_16     [numeric] (18,4),                    ');
       SqlScript1.SQL.Add(' @Minimo_17 	[numeric](18,4),                        ');
       SqlScript1.SQL.Add(' @Unidade2_18 	[varchar] (15),                       ');
       SqlScript1.SQL.Add(' @CasasDecimais1_19 	[integer],                      ');
       SqlScript1.SQL.Add(' @CasasDecimais2_20 	[integer],                      ');
       SqlScript1.SQL.Add(' @TipoCampo2_21 	[char] (1)                          ');
       SqlScript1.SQL.Add(' )                                                   ');
       SqlScript1.SQL.Add(' AS                                                  ');
       SqlScript1.SQL.Add(' Begin                                               ');
       SqlScript1.SQL.Add(' INSERT INTO [ExamesItensPAram]                      ');
       SqlScript1.SQL.Add(' (                                                   ');
       SqlScript1.SQL.Add(' CodExame,                                           ');
       SqlScript1.SQL.Add(' OrdemApresentacao,                                  ');
       SqlScript1.SQL.Add(' NomeItemExame,                                      ');
       SqlScript1.SQL.Add(' Referencia1,                                        ');
       SqlScript1.SQL.Add(' Referencia2,                                        ');
       SqlScript1.SQL.Add(' Unidade1,                                           ');
       SqlScript1.SQL.Add(' Unidade2,                                           ');
       SqlScript1.SQL.Add(' DigitaCampo,                                        ');
       SqlScript1.SQL.Add(' Obrigatorio,                                        ');
       SqlScript1.SQL.Add(' TipoCampo,                                          ');
       SqlScript1.SQL.Add(' Maximo,                                             ');
       SqlScript1.SQL.Add(' Minimo,                                             ');
       SqlScript1.SQL.Add(' CasasDecimais1,                                     ');
       SqlScript1.SQL.Add(' CasasDecimais2,                                     ');
       SqlScript1.SQL.Add(' TipoCampo2                                          ');
       SqlScript1.SQL.Add(' )                                                   ');
       SqlScript1.SQL.Add(' VALUES                                              ');
       SqlScript1.SQL.Add(' (                                                   ');
       SqlScript1.SQL.Add(' @CodExame_3,                                        ');
       SqlScript1.SQL.Add(' @OrdemApresentacao_8,                               ');
       SqlScript1.SQL.Add(' @NomeItemExame_9,                                   ');
       SqlScript1.SQL.Add(' @Referencia1_10,                                    ');
       SqlScript1.SQL.Add(' @Referencia2_11,                                    ');
       SqlScript1.SQL.Add(' @Unidade1_12,                                       ');
       SqlScript1.SQL.Add(' @unidade2_18,                                       ');
       SqlScript1.SQL.Add(' @DigitaCampo_13,                                    ');
       SqlScript1.SQL.Add(' @Obrigatorio_14,                                    ');
       SqlScript1.SQL.Add(' @TipoCampo_15,                                      ');
       SqlScript1.SQL.Add(' @Maximo_16,                                         ');
       SqlScript1.SQL.Add(' @Minimo_17,                                         ');
       SqlScript1.SQL.Add(' @CasasDecimais1_19,                                 ');
       SqlScript1.SQL.Add(' @CasasDecimais2_20,                                 ');
       SqlScript1.SQL.Add(' @TipoCampo2_21                                      ');
       SqlScript1.SQL.Add(' )                                                   ');
       SqlScript1.SQL.Add(' END                                                 ');
       SqlScript1.SQL.Add('                                                     ');
       SqlScript1.ExecSQL;
   end;
//////// Apaga FK
    IF QryFK.Locate('CONSTRAINT_NAME','FK_MovPedido_CONTAS',[]) then
    begin
       SqlScript1.SQL.Clear;
       SQLSCRIPT1.SQL.Add('ALTER TABLE dbo.MovPedido DROP CONSTRAINT FK_MovPedido_CONTAS');
       SQLScript1.ExecSQL;
    end;


////////////////////

    IF not QrySP.Locate('SPECIFIC_NAME;PARAMETER_NAME',VarArrayOf(['SP_Insert_Contas','@CODDESCONTO_19']),[]) then
    begin
       IF QrySPNOME.Locate('SPECIFIC_NAME','SP_Insert_Contas',[]) then
       begin
          SqlScript1.SQL.Clear;
          SqlScript1.SQL.Add(' DROP PROCEDURE SP_Insert_Contas ');
          ShowMessage(SqlScript1.SQL.Text);
          SqlScript1.ExecSQL;
       end;
////// Recria a Procedure
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add ('CREATE PROCEDURE  [dbo].[SP_Insert_Contas] ');
	     SqlScript1.SQL.Add (' (@CodSeqContas_1 	[int] output,           ');
       SqlScript1.SQL.Add ('  @TIPOACAO_2  char(1),                    ');
       SqlScript1.SQL.Add ('      @DESCRICAO_3  varchar(30),           ');
       SqlScript1.SQL.Add ('  @QTDEPARC_4  int,                        ');
       SqlScript1.SQL.Add (' @NUMPARC_5  int,                          ');
       SqlScript1.SQL.Add (' @DTEMISSAO_6 datetime,                    ');
       SqlScript1.SQL.Add (' @DTVENC_7 datetime,                       ');
       SqlScript1.SQL.Add (' @VLCALCULADO_8 numeric (15,2),            ');
       SqlScript1.SQL.Add (' @VLDESCONTO_9 numeric (15,2),             ');
       SqlScript1.SQL.Add (' @VLFATURA_10 numeric (15,2),              ');
       SqlScript1.SQL.Add (' @CODCLIENTE_11 int,                       ');
       SqlScript1.SQL.Add (' @CODFORN_12 int,                          ');
       SqlScript1.SQL.Add (' @NDOCTIT_13 varchar(50),                  ');
       SqlScript1.SQL.Add (' @ATIVO_14 char(1),                        ');
       SqlScript1.SQL.Add (' @CODBANCO_15 int,                         ');
       SqlScript1.SQL.Add (' @TIPOCADASTRO_16 char(1),                 ');
       SqlScript1.SQL.Add (' @DESCR_17 varchar(100),                   ');
       SqlScript1.SQL.Add (' @CodRespProf_18 int,                      ');
       SqlScript1.SQL.Add (' @CODDESCONTO_19 int                       ');
       SqlScript1.SQL.Add (' )                                         ');
       SqlScript1.SQL.Add (' AS                                        ');
       SqlScript1.SQL.Add (' Begin                                     ');
       SqlScript1.SQL.Add (' INSERT INTO [LABVET].[dbo].[CONTAS]       ');
       SqlScript1.SQL.Add ('        ([TIPOACAO]                        ');
       SqlScript1.SQL.Add ('        ,[DESCRICAO]                       ');
       SqlScript1.SQL.Add ('        ,[QTDEPARC]                        ');
       SqlScript1.SQL.Add ('        ,[NUMPARC]                         ');
       SqlScript1.SQL.Add ('        ,[DTEMISSAO]                       ');
       SqlScript1.SQL.Add ('        ,[DTVENC]                          ');
       SqlScript1.SQL.Add ('        ,[VLCALCULADO]                     ');
       SqlScript1.SQL.Add ('        ,[VLDESCONTO]                      ');
       SqlScript1.SQL.Add ('        ,[VLFATURA]                        ');
       SqlScript1.SQL.Add ('        ,[CODCLIENTE]                      ');
       SqlScript1.SQL.Add ('        ,[CODFORN]                         ');
       SqlScript1.SQL.Add ('        ,[NDOCTIT]                         ');
       SqlScript1.SQL.Add ('        ,[ATIVO]                           ');
       SqlScript1.SQL.Add ('        ,[CODBANCO]                        ');
       SqlScript1.SQL.Add ('        ,[TIPOCADASTRO]                    ');
       SqlScript1.SQL.Add ('        ,[DESCR]                           ');
       SqlScript1.SQL.Add ('        ,[CodRespProf]                     ');
       SqlScript1.SQL.Add ('        ,[CODDESCONTO]       )                    ');
       SqlScript1.SQL.Add ('  VALUES                                   ');
       SqlScript1.SQL.Add ('        (@TIPOACAO_2,                      ');
		   SqlScript1.SQL.Add (' 	@DESCRICAO_3,                           ');
		   SqlScript1.SQL.Add (' 	@QTDEPARC_4,                            ');
		   SqlScript1.SQL.Add (' 	@NUMPARC_5,                             ');
		   SqlScript1.SQL.Add (' 	@DTEMISSAO_6,                           ');
		   SqlScript1.SQL.Add (' 	@DTVENC_7,                              ');
		   SqlScript1.SQL.Add (' 	@VLCALCULADO_8,                         ');
		   SqlScript1.SQL.Add (' 	@VLDESCONTO_9,                          ');
		   SqlScript1.SQL.Add (' 	@VLFATURA_10,                           ');
		   SqlScript1.SQL.Add (' 	@CODCLIENTE_11,                         ');
		   SqlScript1.SQL.Add (' 	@CODFORN_12,                            ');
		   SqlScript1.SQL.Add (' 	@NDOCTIT_13,                            ');
		   SqlScript1.SQL.Add (' 	@ATIVO_14,                              ');
    	 SqlScript1.SQL.Add (' 	@CODBANCO_15,                           ');
	     SqlScript1.SQL.Add (' 	@TIPOCADASTRO_16,                       ');
	     SqlScript1.SQL.Add (' 	@DESCR_17,                              ');
       SqlScript1.SQL.Add ('   @CodRespProf_18, ');
       SqlScript1.SQL.Add ('   @CODDESCONTO_19    ');
       SqlScript1.SQL.Add (' )                                         ');
       SqlScript1.SQL.Add (' set @CodSeqContas_1 = @@identity          ');
       SqlScript1.SQL.Add (' END                                       ');
//       ShowMessage(SqlScript1.SQL.Text);
       SqlScript1.ExecSQL;
    end;


    IF not QrySP.Locate('SPECIFIC_NAME;PARAMETER_NAME',VarArrayOf(['SP_Insert_Contas_Transf','@CodSeqContas_1']),[]) then
    begin
       SqlScript1.SQL.Clear;
       SqlScript1.SQL.Add (' CREATE PROCEDURE  [dbo].[SP_Insert_Contas_Transf]     ');
       SqlScript1.SQL.Add (' (@CodSeqContas_1 	[int] output,                      ');
       SqlScript1.SQL.Add (' @TIPOACAO_2  char(1),                                 ');
       SqlScript1.SQL.Add (' @DESCRICAO_3  varchar(30),                            ');
       SqlScript1.SQL.Add (' @QTDEPARC_4  int,                                     ');
       SqlScript1.SQL.Add (' @NUMPARC_5  int,                                      ');
       SqlScript1.SQL.Add (' @DTEMISSAO_6 datetime,                                ');
       SqlScript1.SQL.Add (' @DTVENC_7 datetime,                                   ');
       SqlScript1.SQL.Add (' @VLCALCULADO_8 numeric (15,2),                        ');
       SqlScript1.SQL.Add (' @VLDESCONTO_9 numeric (15,2),                         ');
       SqlScript1.SQL.Add (' @VLFATURA_10 numeric (15,2),                          ');
       SqlScript1.SQL.Add (' @CODCLIENTE_11 int,                                   ');
       SqlScript1.SQL.Add (' @CODFORN_12 int,                                      ');
       SqlScript1.SQL.Add (' @NDOCTIT_13 varchar(50),                              ');
       SqlScript1.SQL.Add (' @ATIVO_14 char(1),                                    ');
       SqlScript1.SQL.Add (' @CODBANCO_15 int,                                     ');
       SqlScript1.SQL.Add (' @TIPOCADASTRO_16 char(1),                             ');
       SqlScript1.SQL.Add (' @DESCR_17 varchar(100),                               ');
       SqlScript1.SQL.Add (' @CodRespProf_18 int,                                  ');
       SqlScript1.SQL.Add (' @CODDESCONTO_19 int,                                  ');
       SqlScript1.SQL.Add (' @VLPGTO_20 numeric (18,2),                            ');
       SqlScript1.SQL.Add (' @DTPGTO_21 datetime                                   ');
       SqlScript1.SQL.Add (' )                                                     ');
       SqlScript1.SQL.Add (' AS                                                    ');
       SqlScript1.SQL.Add (' Begin                                                 ');
       SqlScript1.SQL.Add (' INSERT INTO [LABVET].[dbo].[CONTAS]                   ');
       SqlScript1.SQL.Add (' ([TIPOACAO]                                           ');
       SqlScript1.SQL.Add (' ,[DESCRICAO]                                          ');
       SqlScript1.SQL.Add (' ,[QTDEPARC]                                           ');
       SqlScript1.SQL.Add (' ,[NUMPARC]                                            ');
       SqlScript1.SQL.Add (' ,[DTEMISSAO]                                          ');
       SqlScript1.SQL.Add (' ,[DTVENC]                                             ');
       SqlScript1.SQL.Add (' ,[VLCALCULADO]                                        ');
       SqlScript1.SQL.Add (' ,[VLDESCONTO]                                         ');
       SqlScript1.SQL.Add (' ,[VLFATURA]                                           ');
       SqlScript1.SQL.Add (' ,[CODCLIENTE]                                         ');
       SqlScript1.SQL.Add (' ,[CODFORN]                                            ');
       SqlScript1.SQL.Add (' ,[NDOCTIT]                                            ');
       SqlScript1.SQL.Add (' ,[ATIVO]                                              ');
       SqlScript1.SQL.Add (' ,[CODBANCO]                                           ');
       SqlScript1.SQL.Add (' ,[TIPOCADASTRO]                                       ');
       SqlScript1.SQL.Add (' ,[DESCR]                                              ');
       SqlScript1.SQL.Add (' ,[CodRespProf]                                        ');
       SqlScript1.SQL.Add (' ,[CODDESCONTO]                                        ');
       SqlScript1.SQL.Add (' ,[VLPGTO]                                             ');
       SqlScript1.SQL.Add (' ,[DTPGTO]       )                                     ');
       SqlScript1.SQL.Add (' VALUES                                                ');
       SqlScript1.SQL.Add (' (@TIPOACAO_2,                                         ');
       SqlScript1.SQL.Add (' @DESCRICAO_3,                                         ');
       SqlScript1.SQL.Add (' @QTDEPARC_4,                                          ');
       SqlScript1.SQL.Add (' @NUMPARC_5,                                           ');
       SqlScript1.SQL.Add (' @DTEMISSAO_6,                                         ');
       SqlScript1.SQL.Add (' @DTVENC_7,                                            ');
       SqlScript1.SQL.Add (' @VLCALCULADO_8,                                       ');
       SqlScript1.SQL.Add (' @VLDESCONTO_9,                                        ');
       SqlScript1.SQL.Add (' @VLFATURA_10,                                         ');
       SqlScript1.SQL.Add (' @CODCLIENTE_11,                                       ');
       SqlScript1.SQL.Add (' @CODFORN_12,                                          ');
       SqlScript1.SQL.Add (' @NDOCTIT_13,                                          ');
       SqlScript1.SQL.Add (' @ATIVO_14,                                            ');
       SqlScript1.SQL.Add (' @CODBANCO_15,                                         ');
       SqlScript1.SQL.Add (' @TIPOCADASTRO_16,                                     ');
       SqlScript1.SQL.Add (' @DESCR_17,                                            ');
       SqlScript1.SQL.Add (' @CodRespProf_18,                                      ');
       SqlScript1.SQL.Add (' @CODDESCONTO_19,                                      ');
       SqlScript1.SQL.Add (' @VLPGTO_20,                                           ');
       SqlScript1.SQL.Add (' @DTPGTO_21                                            ');
       SqlScript1.SQL.Add (' )                                                     ');
       SqlScript1.SQL.Add (' set @CodSeqContas_1 = @@identity                      ');
       SqlScript1.SQL.Add (' END                                                   ');
       SqlScript1.ExecSQL;
    end;





////////

    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['V_SALDOENTRADA','CODBANCO']),[]) then
    begin
          SqlScript1.SQL.Clear;
          SqlScript1.SQL.Add(' CREATE VIEW [dbo].[V_SALDOENTRADA]  ');
          SqlScript1.SQL.Add(' AS                                             ');
          SqlScript1.SQL.Add(' SELECT     CODBANCO, DTpgto, sum(vlpgto) as Recebido ');
          SqlScript1.SQL.Add(' FROM       Contas ');
          SqlScript1.SQL.Add(' WHERE ativo = ''S'' and TIPOACAO = ''R''');
          SqlScript1.SQL.Add(' and vlpgto > 0');
          SQlScript1.SQL.Add(' Group By CODBANCO, DTpgto ');
          SqlScript1.ExecSQL;
    end;

    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['V_SALDOSAIDA','CODBANCO']),[]) then
    begin
          SqlScript1.SQL.Clear;
          SqlScript1.SQL.Add(' CREATE VIEW [dbo].[V_SALDOSAIDA]  ');
          SqlScript1.SQL.Add(' AS                                             ');
          SqlScript1.SQL.Add(' SELECT     CODBANCO, DTpgto, sum(vlpgto) as Pago ');
          SqlScript1.SQL.Add(' FROM       Contas ');
          SqlScript1.SQL.Add(' WHERE ativo = ''S'' and TIPOACAO = ''P''');
          SqlScript1.SQL.Add(' and vlpgto > 0');
          SQlScript1.SQL.Add(' Group By CODBANCO, DTpgto ');
          SqlScript1.ExecSQL;
    end;

    IF not QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['SALDO','CODBANCO']),[]) then
    begin
          SqlScript1.SQL.Clear;
          SqlScript1.SQL.Add(' CREATE TABLE [dbo].[SALDO]  ');
          SqlScript1.SQL.Add( ' (   CODBANCO Integer NOT NULL, ');
          SqlScript1.SQL.Add( '     ENTRADA   numeric(18,2)  NULL, ');
          SqlScript1.SQL.Add( '     SAIDA numeric (18,2) NULL, ');
          SqlScript1.SQL.Add( '     RECEBIDO   numeric (18,2) NULL, ');
          SqlScript1.SQL.Add( '     PAGO numeric (18,2) NULL ');
          SqlScript1.SQL.Add( ' ) ');
          SqlScript1.ExecSQL;
    end;

    IF QryTables.Locate('TABLE_NAME;COLUMN_NAME',VarArrayOf(['SALDO','ENTRADA']),[]) then
    begin
          IF QryTablesNumeric_Scale.Value = 0 then
          begin
              SqlScript1.SQL.Clear;
              SqlScript1.SQL.Add(' DROP TABLE [dbo].[SALDO]  ');
             SqlScript1.ExecSQL;
          SqlScript1.SQL.Clear;
          SqlScript1.SQL.Add(' CREATE TABLE [dbo].[SALDO]  ');
          SqlScript1.SQL.Add( ' (   CODBANCO Integer NOT NULL, ');
          SqlScript1.SQL.Add( '     ENTRADA   numeric(18,2)  NULL, ');
          SqlScript1.SQL.Add( '     SAIDA numeric (18,2) NULL, ');
          SqlScript1.SQL.Add( '     RECEBIDO   numeric (18,2) NULL, ');
          SqlScript1.SQL.Add( '     PAGO numeric (18,2) NULL ');
          SqlScript1.SQL.Add( ' ) ');
          SqlScript1.ExecSQL;
          end;
    end;


    SBDesconto.Caption := 'Desconto'+#13+'Progressivo';



end;

procedure TFrmMenu.SpeedButton4Click(Sender: TObject);
begin
   IF FrmFtp = nil then
      FrmFtp := TFrmFtp.Create(Self);
   FrmFtp.ShowModal;
   close;
end;

procedure TFrmMenu.CadastrodaEmpresa1Click(Sender: TObject);
begin
       IF FrmEmpresa = nil then
          FrmEmpresa := TFrmEmpresa.create(Self);

       DMLABVET.QryEmpresa.Edit;
       FrmEmpresa.Showmodal;

end;

procedure TFrmMenu.ProfissionaisSolicitantes1Click(Sender: TObject);
begin
   IF FrmProfSolic = nil then
     FrmProfSolic := TFrmProfSolic.create(Self);
   FrmProfSolic.ShowModal;

end;

procedure TFrmMenu.ProfissionaisInternosLiberaodosLaudos1Click(
  Sender: TObject);
begin
   IF FrmProfLaudo = nil then
     FrmProfLaudo := TFrmProfLaudo.create(Self);
   FrmProfLaudo.ShowModal;

end;

procedure TFrmMenu.Clientes1Click(Sender: TObject);
begin
   IF FrmClientes = nil then
      FrmClientes := TFrmClientes.Create(Self);
   FrmClientes.ShowModal;
end;


procedure TFrmMenu.SBClientesClick(Sender: TObject);
begin
   IF FrmClientes = nil then
      FrmClientes := TFrmClientes.Create(Self);
   FrmClientes.ShowModal;

end;

procedure TFrmMenu.Animais1Click(Sender: TObject);
begin
   IF FrmAnimais = nil then
      FrmAnimais := TFrmAnimais.Create(Self);
   FrmAnimais.ShowModal;

end;

procedure TFrmMenu.Espcie1Click(Sender: TObject);
begin
   IF FrmEspecie = nil then
      FrmEspecie := TFrmEspecie.Create(Self);
   FrmEspecie.ShowModal;

end;

procedure TFrmMenu.Exame1Click(Sender: TObject);
begin

   IF FrmExamesParam = nil then
      FrmExamesParam := TFrmExamesParam.Create(Self);
   FrmExamesParam.ShowModal;

end;

procedure TFrmMenu.Pedidos1Click(Sender: TObject);
begin
   IF FrmPedido = nil then
      FrmPedido := TFrmPedido.Create(Self);
   FrmPedido.ShowModal;

end;

procedure TFrmMenu.SpeedButton2Click(Sender: TObject);
begin
   Pedidos1.Click;
end;

procedure TFrmMenu.SpeedButton3Click(Sender: TObject);
begin
   IF FrmLaudo = nil then
     FrmLaudo := TFrmLaudo.create(Self);
   FrmLaudo.laudo := 0;
   FrmLaudo.ShowModal;

end;

procedure TFrmMenu.SBRetiradaClick(Sender: TObject);
begin
   IF FrmRetiraPedido = nil then
     FrmRetiraPedido := TFrmRetiraPedido.create(Self);
   FrmRetiraPedido.Retira := 0;
   FrmRetiraPedido.ShowModal;

end;

procedure TFrmMenu.SBRetiradoClick(Sender: TObject);
begin
   IF FrmRetiraPedido = nil then
     FrmRetiraPedido := TFrmRetiraPedido.create(Self);
   FrmRetiraPedido.Retira := 1;
   FrmRetiraPedido.ShowModal;

end;

procedure TFrmMenu.SpeedButton5Click(Sender: TObject);
begin
   IF FrmLaudo = nil then
     FrmLaudo := TFrmLaudo.create(Self);
   FrmLaudo.laudo := 1;
   FrmLaudo.ShowModal;

end;

procedure TFrmMenu.SBBancoClick(Sender: TObject);
begin
   IF FrmBanco = nil then
     FrmBanco := TFrmBanco.create(Self);
   FrmBanco.ShowModal;

end;

procedure TFrmMenu.Cliente1Click(Sender: TObject);
begin
   IF FrmClientes = nil then
      FrmClientes := TFrmClientes.Create(Self);
   FrmClientes.ShowModal;

end;

procedure TFrmMenu.SBVeterinarioClick(Sender: TObject);
begin
   IF FrmProfSolic = nil then
     FrmProfSolic := TFrmProfSolic.create(Self);
   FrmProfSolic.ShowModal;

end;

procedure TFrmMenu.SBFornecedorClick(Sender: TObject);
begin
   IF FrmFornecedor = nil then
     FrmFornecedor := TFrmFornecedor.create(Self);
   FrmFornecedor.ShowModal;

end;

procedure TFrmMenu.SBFechamentoClick(Sender: TObject);
begin
   IF FrmFechamento = nil then
     FrmFechamento := TFrmFechamento.create(Self);
   FrmFechamento.ShowModal;

end;

procedure TFrmMenu.SBContasClick(Sender: TObject);
begin
   IF FrmContas = nil then
     FrmContas := TFrmContas.create(Self);
   FrmContas.ShowModal;

end;

procedure TFrmMenu.SPPendentesClick(Sender: TObject);
begin
   IF FrmPendentes = nil then
     FrmPendentes := TFrmPendentes.create(Self);
   FrmPendentes.ShowModal;

end;

procedure TFrmMenu.SpeedButton1Click(Sender: TObject);
begin
   IF FrmCobranca = nil then
     FrmCobranca := TFrmCobranca.create(Self);
   FrmCobranca.wacao := 1;
   FrmCobranca.ShowModal;

end;

procedure TFrmMenu.Backup1Click(Sender: TObject);
begin
   IF FrmBackup = nil then
     FrmBackup := TFrmBackup.create(Self);
   FrmBackup.ShowModal;
end;

procedure TFrmMenu.Administrador1Click(Sender: TObject);
begin
   UsersCS1.UsersAdm;
end;

procedure TFrmMenu.SBDescontoClick(Sender: TObject);
begin
   IF FrmDesconto = nil then
     FrmDesconto := TFrmDesconto.create(Self);
   FrmDesconto.ShowModal;

end;

procedure TFrmMenu.SBTransfereClick(Sender: TObject);
begin
   IF FrmTransfere = nil then
     FrmTransfere := TFrmtransfere.create(Self);
   FrmTransfere.ShowModal;

end;

procedure TFrmMenu.SBExtratoPedidoClick(Sender: TObject);
begin
   IF FrmExtratoPedido = nil then
     FrmExtratoPedido := TFrmExtratoPedido.create(Self);
   FrmExtratoPedido.ShowModal;

end;

procedure TFrmMenu.SBRelDescontosClick(Sender: TObject);
begin
   IF FrmCobranca = nil then
     FrmCobranca := TFrmCobranca.create(Self);
   FrmCobranca.wacao := 2;
   FrmCobranca.ShowModal;

end;

end.
