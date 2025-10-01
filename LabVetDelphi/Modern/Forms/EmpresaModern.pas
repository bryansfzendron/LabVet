unit EmpresaModern;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, Buttons, DBCtrls, Mask, ExtCtrls, ExtDlgs, jpeg,
  FireDAC.Comp.Client, EmpresaService, EmpresaRepository, EmpresaDTO,
  IEmpresaRepository;

type
  TFrmEmpresaModern = class(TForm)
    Panel1: TPanel;
    Panel2: TPanel;
    ScrollBox1: TScrollBox;
    Label1: TLabel;
    EdtEmpresa: TEdit;
    Label2: TLabel;
    EdtFantasia: TEdit;
    Label3: TLabel;
    EdtAbreviatura: TEdit;
    Label4: TLabel;
    EdtEndereco: TEdit;
    Label5: TLabel;
    EdtBairro: TEdit;
    Label6: TLabel;
    EdtCidade: TEdit;
    Label7: TLabel;
    EdtUF: TEdit;
    Label8: TLabel;
    EdtCEP: TMaskEdit;
    Label9: TLabel;
    EdtCNPJ: TMaskEdit;
    Label10: TLabel;
    EdtFone1: TMaskEdit;
    Label11: TLabel;
    EdtFone2: TMaskEdit;
    Label12: TLabel;
    ImgEmpresa: TImage;
    Label13: TLabel;
    EdtVersao: TEdit;
    Label14: TLabel;
    EdtPOP3: TEdit;
    Label15: TLabel;
    EdtSMTP: TEdit;
    Label16: TLabel;
    EdtEmail: TEdit;
    Label17: TLabel;
    EdtSenha: TEdit;
    Label18: TLabel;
    EdtSite: TEdit;
    BtnGravar: TBitBtn;
    BtnCancelar: TBitBtn;
    BtnCarregarImagem: TBitBtn;
    BtnNovo: TBitBtn;
    BtnExcluir: TBitBtn;
    BtnPesquisar: TBitBtn;
    OpenPictureDialog1: TOpenPictureDialog;
    
    procedure FormCreate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
    procedure BtnGravarClick(Sender: TObject);
    procedure BtnCancelarClick(Sender: TObject);
    procedure BtnCarregarImagemClick(Sender: TObject);
    procedure BtnNovoClick(Sender: TObject);
    procedure BtnExcluirClick(Sender: TObject);
    procedure BtnPesquisarClick(Sender: TObject);
    procedure EdtCNPJExit(Sender: TObject);
    procedure EdtEmailExit(Sender: TObject);
    
  private
    FConnection: TFDConnection;
    FEmpresaService: TEmpresaService;
    FEmpresaRepository: IEmpresaRepository;
    FEmpresaAtual: TEmpresaDTO;
    FModoEdicao: Boolean;
    
    procedure InicializarServicos;
    procedure LimparFormulario;
    procedure CarregarEmpresaNoFormulario(Empresa: TEmpresaDTO);
    function ObterEmpresaDoFormulario: TEmpresaDTO;
    procedure ConfigurarModoEdicao(Editando: Boolean);
    procedure ValidarCamposObrigatorios;
    function SelecionarEmpresa: Integer;
    
  public
    procedure CarregarEmpresa(Id: Integer);
    property ModoEdicao: Boolean read FModoEdicao;
  end;

var
  FrmEmpresaModern: TFrmEmpresaModern;

implementation

uses
  ConnectionManager, EmpresaPesquisa;

{$R *.dfm}

{ TFrmEmpresaModern }

procedure TFrmEmpresaModern.FormCreate(Sender: TObject);
begin
  InicializarServicos;
  LimparFormulario;
  ConfigurarModoEdicao(False);
end;

procedure TFrmEmpresaModern.FormDestroy(Sender: TObject);
begin
  if Assigned(FEmpresaAtual) then
    FEmpresaAtual.Free;
  if Assigned(FEmpresaService) then
    FEmpresaService.Free;
end;

procedure TFrmEmpresaModern.InicializarServicos;
begin
  // Obter conexão do gerenciador de conexões
  FConnection := TConnectionManager.GetInstance.GetConnection;
  
  // Criar repository e service
  FEmpresaRepository := TEmpresaRepository.Create(FConnection);
  FEmpresaService := TEmpresaService.Create(FEmpresaRepository);
end;

procedure TFrmEmpresaModern.LimparFormulario;
begin
  EdtEmpresa.Clear;
  EdtFantasia.Clear;
  EdtAbreviatura.Clear;
  EdtEndereco.Clear;
  EdtBairro.Clear;
  EdtCidade.Clear;
  EdtUF.Clear;
  EdtCEP.Clear;
  EdtCNPJ.Clear;
  EdtFone1.Clear;
  EdtFone2.Clear;
  EdtVersao.Clear;
  EdtPOP3.Clear;
  EdtSMTP.Clear;
  EdtEmail.Clear;
  EdtSenha.Clear;
  EdtSite.Clear;
  ImgEmpresa.Picture := nil;
  
  if Assigned(FEmpresaAtual) then
  begin
    FEmpresaAtual.Free;
    FEmpresaAtual := nil;
  end;
end;

procedure TFrmEmpresaModern.CarregarEmpresaNoFormulario(Empresa: TEmpresaDTO);
begin
  if not Assigned(Empresa) then
    Exit;
    
  EdtEmpresa.Text := Empresa.Empresa;
  EdtFantasia.Text := Empresa.Fantasia;
  EdtAbreviatura.Text := Empresa.Abreviatura;
  EdtEndereco.Text := Empresa.Endereco;
  EdtBairro.Text := Empresa.Bairro;
  EdtCidade.Text := Empresa.Cidade;
  EdtUF.Text := Empresa.UF;
  EdtCEP.Text := Empresa.CEP;
  EdtCNPJ.Text := Empresa.CNPJ;
  EdtFone1.Text := Empresa.Fone1;
  EdtFone2.Text := Empresa.Fone2;
  EdtVersao.Text := Empresa.Versao;
  EdtPOP3.Text := Empresa.POP3;
  EdtSMTP.Text := Empresa.SMTP;
  EdtEmail.Text := Empresa.Email;
  EdtSenha.Text := Empresa.Senha;
  EdtSite.Text := Empresa.Site;
  
  // Carregar imagem se existir
  if Empresa.Imagem.Size > 0 then
  begin
    Empresa.Imagem.Position := 0;
    ImgEmpresa.Picture.LoadFromStream(Empresa.Imagem);
  end;
end;

function TFrmEmpresaModern.ObterEmpresaDoFormulario: TEmpresaDTO;
begin
  Result := TEmpresaDTO.Create;
  
  if Assigned(FEmpresaAtual) then
    Result.CodEmpresa := FEmpresaAtual.CodEmpresa;
    
  Result.Empresa := Trim(EdtEmpresa.Text);
  Result.Fantasia := Trim(EdtFantasia.Text);
  Result.Abreviatura := Trim(EdtAbreviatura.Text);
  Result.Endereco := Trim(EdtEndereco.Text);
  Result.Bairro := Trim(EdtBairro.Text);
  Result.Cidade := Trim(EdtCidade.Text);
  Result.UF := Trim(EdtUF.Text);
  Result.CEP := Trim(EdtCEP.Text);
  Result.CNPJ := Trim(EdtCNPJ.Text);
  Result.Fone1 := Trim(EdtFone1.Text);
  Result.Fone2 := Trim(EdtFone2.Text);
  Result.Versao := Trim(EdtVersao.Text);
  Result.POP3 := Trim(EdtPOP3.Text);
  Result.SMTP := Trim(EdtSMTP.Text);
  Result.Email := Trim(EdtEmail.Text);
  Result.Senha := Trim(EdtSenha.Text);
  Result.Site := Trim(EdtSite.Text);
  
  // Copiar imagem se existir
  if Assigned(ImgEmpresa.Picture.Graphic) then
  begin
    ImgEmpresa.Picture.SaveToStream(Result.Imagem);
  end;
end;

procedure TFrmEmpresaModern.ConfigurarModoEdicao(Editando: Boolean);
begin
  FModoEdicao := Editando;
  
  // Habilitar/desabilitar campos
  EdtEmpresa.Enabled := Editando;
  EdtFantasia.Enabled := Editando;
  EdtAbreviatura.Enabled := Editando;
  EdtEndereco.Enabled := Editando;
  EdtBairro.Enabled := Editando;
  EdtCidade.Enabled := Editando;
  EdtUF.Enabled := Editando;
  EdtCEP.Enabled := Editando;
  EdtCNPJ.Enabled := Editando;
  EdtFone1.Enabled := Editando;
  EdtFone2.Enabled := Editando;
  EdtVersao.Enabled := Editando;
  EdtPOP3.Enabled := Editando;
  EdtSMTP.Enabled := Editando;
  EdtEmail.Enabled := Editando;
  EdtSenha.Enabled := Editando;
  EdtSite.Enabled := Editando;
  BtnCarregarImagem.Enabled := Editando;
  
  // Configurar botões
  BtnGravar.Enabled := Editando;
  BtnCancelar.Enabled := Editando;
  BtnNovo.Enabled := not Editando;
  BtnExcluir.Enabled := not Editando and Assigned(FEmpresaAtual);
  BtnPesquisar.Enabled := not Editando;
end;

procedure TFrmEmpresaModern.ValidarCamposObrigatorios;
begin
  if Trim(EdtEmpresa.Text) = '' then
  begin
    EdtEmpresa.SetFocus;
    raise Exception.Create('Nome da empresa é obrigatório');
  end;
end;

procedure TFrmEmpresaModern.BtnNovoClick(Sender: TObject);
begin
  LimparFormulario;
  ConfigurarModoEdicao(True);
  EdtEmpresa.SetFocus;
end;

procedure TFrmEmpresaModern.BtnGravarClick(Sender: TObject);
var
  EmpresaDTO: TEmpresaDTO;
  Sucesso: Boolean;
begin
  try
    ValidarCamposObrigatorios;
    
    EmpresaDTO := ObterEmpresaDoFormulario;
    try
      if Assigned(FEmpresaAtual) and (FEmpresaAtual.CodEmpresa > 0) then
      begin
        // Atualizar empresa existente
        Sucesso := FEmpresaService.AtualizarEmpresa(EmpresaDTO);
        if Sucesso then
        begin
          ShowMessage('Empresa atualizada com sucesso!');
          // Recarregar dados atualizados
          CarregarEmpresa(EmpresaDTO.CodEmpresa);
        end;
      end
      else
      begin
        // Cadastrar nova empresa
        Sucesso := FEmpresaService.CadastrarEmpresa(EmpresaDTO);
        if Sucesso then
        begin
          ShowMessage('Empresa cadastrada com sucesso!');
          // Carregar empresa recém-criada
          CarregarEmpresa(EmpresaDTO.CodEmpresa);
        end;
      end;
      
      if Sucesso then
        ConfigurarModoEdicao(False);
        
    finally
      EmpresaDTO.Free;
    end;
    
  except
    on E: Exception do
    begin
      ShowMessage('Erro ao salvar empresa: ' + E.Message);
    end;
  end;
end;

procedure TFrmEmpresaModern.BtnCancelarClick(Sender: TObject);
begin
  if Assigned(FEmpresaAtual) then
    CarregarEmpresaNoFormulario(FEmpresaAtual)
  else
    LimparFormulario;
    
  ConfigurarModoEdicao(False);
end;

procedure TFrmEmpresaModern.BtnExcluirClick(Sender: TObject);
begin
  if not Assigned(FEmpresaAtual) then
    Exit;
    
  if MessageDlg('Confirma a exclusão desta empresa?', mtConfirmation, [mbYes, mbNo], 0) = mrYes then
  begin
    try
      if FEmpresaService.ExcluirEmpresa(FEmpresaAtual.CodEmpresa) then
      begin
        ShowMessage('Empresa excluída com sucesso!');
        LimparFormulario;
        ConfigurarModoEdicao(False);
      end;
    except
      on E: Exception do
        ShowMessage('Erro ao excluir empresa: ' + E.Message);
    end;
  end;
end;

procedure TFrmEmpresaModern.BtnPesquisarClick(Sender: TObject);
var
  IdSelecionado: Integer;
begin
  IdSelecionado := SelecionarEmpresa;
  if IdSelecionado > 0 then
    CarregarEmpresa(IdSelecionado);
end;

procedure TFrmEmpresaModern.BtnCarregarImagemClick(Sender: TObject);
begin
  if OpenPictureDialog1.Execute then
  begin
    ImgEmpresa.Picture.LoadFromFile(OpenPictureDialog1.FileName);
  end;
end;

procedure TFrmEmpresaModern.EdtCNPJExit(Sender: TObject);
var
  CNPJ: string;
begin
  CNPJ := Trim(EdtCNPJ.Text);
  if CNPJ <> '' then
  begin
    try
      if not FEmpresaService.VerificarCNPJDisponivel(CNPJ, 
        IfThen(Assigned(FEmpresaAtual), FEmpresaAtual.CodEmpresa, 0)) then
      begin
        ShowMessage('CNPJ já cadastrado para outra empresa!');
        EdtCNPJ.SetFocus;
      end;
    except
      on E: Exception do
        ShowMessage('Erro ao validar CNPJ: ' + E.Message);
    end;
  end;
end;

procedure TFrmEmpresaModern.EdtEmailExit(Sender: TObject);
var
  Email: string;
begin
  Email := Trim(EdtEmail.Text);
  if Email <> '' then
  begin
    // Validação básica de email usando o DTO
    var TempDTO := TEmpresaDTO.Create;
    try
      TempDTO.Email := Email;
      var Erros := TempDTO.GetValidationErrors;
      if Length(Erros) > 0 then
      begin
        ShowMessage('Email inválido!');
        EdtEmail.SetFocus;
      end;
    finally
      TempDTO.Free;
    end;
  end;
end;

procedure TFrmEmpresaModern.CarregarEmpresa(Id: Integer);
begin
  try
    if Assigned(FEmpresaAtual) then
      FEmpresaAtual.Free;
      
    FEmpresaAtual := FEmpresaService.ObterEmpresaPorId(Id);
    CarregarEmpresaNoFormulario(FEmpresaAtual);
    ConfigurarModoEdicao(False);
  except
    on E: Exception do
    begin
      ShowMessage('Erro ao carregar empresa: ' + E.Message);
      LimparFormulario;
    end;
  end;
end;

function TFrmEmpresaModern.SelecionarEmpresa: Integer;
begin
  // Aqui seria aberto um formulário de pesquisa
  // Por simplicidade, retornando 0
  Result := 0;
  
  // Implementação real seria algo como:
  // var FrmPesquisa := TFrmEmpresaPesquisa.Create(Self);
  // try
  //   FrmPesquisa.EmpresaService := FEmpresaService;
  //   if FrmPesquisa.ShowModal = mrOk then
  //     Result := FrmPesquisa.EmpresaSelecionada.CodEmpresa;
  // finally
  //   FrmPesquisa.Free;
  // end;
end;

end.