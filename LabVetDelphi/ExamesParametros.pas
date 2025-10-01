unit ExamesParametros;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, DB, DBTables, StdCtrls, DBCtrls, ToolEdit, RXDBCtrl, Mask,
  Grids, DBGrids, ComCtrls, RxLookup, ExtCtrls, Buttons, CurrEdit, Spin,
  RxDBComb, CheckLst;

type
  TFrmExamesParam = class(TForm)
    Panel1: TPanel;
    Label1: TLabel;
    Label9: TLabel;
    EdNome: TEdit;
    BbtnPesquisar: TBitBtn;
    RxDBLookupCombo2: TRxDBLookupCombo;
    Panel3: TPanel;
    PageControl1: TPageControl;
    TSPesquisa: TTabSheet;
    Panel2: TPanel;
    BBtnIncluir: TBitBtn;
    BBtnAlterar: TBitBtn;
    BbtnExcluir: TBitBtn;
    BbtnImprimir: TBitBtn;
    BBtnFechat: TBitBtn;
    Panel5: TPanel;
    TSManutencao: TTabSheet;
    Label2: TLabel;
    Label3: TLabel;
    Label5: TLabel;
    Panel4: TPanel;
    BBtnGravar: TBitBtn;
    BBtnCancelar: TBitBtn;
    DBEdit1: TDBEdit;
    DBEdit2: TDBEdit;
    RxDBLookupCombo3: TRxDBLookupCombo;
    QryQualquer: TQuery;
    UDPQualquer: TUpdateSQL;
    DSQualquer: TDataSource;
    QryCliente: TQuery;
    QryClienteCodCliente: TAutoIncField;
    QryClienteNome: TStringField;
    QryClienteEndereco: TStringField;
    QryClientenumero: TStringField;
    QryClienteCompl: TStringField;
    QryClienteBairro: TStringField;
    QryClienteCEP: TStringField;
    QryClienteCidade: TStringField;
    QryClienteUF: TStringField;
    QryClienteTelefone: TStringField;
    QryClienteFax: TStringField;
    QryClienteCelular: TStringField;
    QryClienteemail: TStringField;
    QryClientecpf_cgc: TStringField;
    QryClienteContato: TStringField;
    QryClienteDataCadastro: TDateTimeField;
    QryClienteRestricao: TStringField;
    QryClienteDataAtualizacao: TDateTimeField;
    QryClienteAtivo: TStringField;
    DSCliente: TDataSource;
    QryEspecie: TQuery;
    QryEspecieCodEspecie: TAutoIncField;
    QryEspecieNomeEspecie: TStringField;
    DSEspecie: TDataSource;
    QryQualquerEspecie: TStringField;
    Label4: TLabel;
    RxDBCalcEdit1: TRxDBCalcEdit;
    Label6: TLabel;
    DBEdit3: TDBEdit;
    DBCheckBox1: TDBCheckBox;
    Panel6: TPanel;
    Panel7: TPanel;
    DBGrid1: TDBGrid;
    Panel8: TPanel;
    Panel9: TPanel;
    Panel10: TPanel;
    Label7: TLabel;
    BbtnIncluirItens: TBitBtn;
    BbtnAlterarItens: TBitBtn;
    BbtnExcluirItens: TBitBtn;
    DBGrid2: TDBGrid;
    QryQualquerCodExame: TAutoIncField;
    QryQualquerCodEspecie: TIntegerField;
    QryQualquerNomeExame: TStringField;
    QryQualquerNomeExameReduz: TStringField;
    QryQualquerValor: TFloatField;
    QryQualquerDias_Elaboracao_Exame: TIntegerField;
    QryQualquerImprimirSeparado: TStringField;
    TSItens: TTabSheet;
    QryQualquerMetodo: TStringField;
    QryQualquerMaterial: TStringField;
    Label8: TLabel;
    DBEdit4: TDBEdit;
    Label10: TLabel;
    DBEdit5: TDBEdit;
    QryExamesItens: TQuery;
    DSExamesItens: TDataSource;
    UPDItens: TUpdateSQL;
    Panel11: TPanel;
    BitBtn1: TBitBtn;
    BbtnCancelaItens: TBitBtn;
    Label11: TLabel;
    Label12: TLabel;
    DBEdit6: TDBEdit;
    SpinEdit1: TSpinEdit;
    Label13: TLabel;
    QryExameItensSeq: TQuery;
    Label14: TLabel;
    DBEdit7: TDBEdit;
    Label15: TLabel;
    DBEdit8: TDBEdit;
    GroupBox1: TGroupBox;
    DBEdit9: TDBEdit;
    Label16: TLabel;
    Label17: TLabel;
    DBEdit10: TDBEdit;
    Memo1: TMemo;
    DBCheckBox2: TDBCheckBox;
    DBCheckBox3: TDBCheckBox;
    Label18: TLabel;
    RxDBComboBox1: TRxDBComboBox;
    Label19: TLabel;
    QryExamesItensCodItensExame: TAutoIncField;
    QryExamesItensCodExame: TIntegerField;
    QryExamesItensOrdemApresentacao: TIntegerField;
    QryExamesItensNomeItemExame: TStringField;
    QryExamesItensReferencia1: TStringField;
    QryExamesItensReferencia2: TStringField;
    QryExamesItensDigitaCampo: TStringField;
    QryExamesItensMinimo: TFloatField;
    QryExamesItensMaximo: TFloatField;
    QryExamesItensObrigatorio: TStringField;
    QryExamesItensTipoCampo: TStringField;
    Label20: TLabel;
    DBEdit11: TDBEdit;
    QryExamesItensUnidade1: TStringField;
    QryExamesItensUnidade2: TStringField;
    Label21: TLabel;
    DBEdit12: TDBEdit;
    QryExameItensSeqCodItensExame: TAutoIncField;
    QryExameItensSeqCodExame: TIntegerField;
    QryExameItensSeqOrdemApresentacao: TIntegerField;
    QryExameItensSeqNomeItemExame: TStringField;
    QryExameItensSeqReferencia1: TStringField;
    QryExameItensSeqReferencia2: TStringField;
    QryExameItensSeqUnidade1: TStringField;
    QryExameItensSeqUnidade2: TStringField;
    QryExameItensSeqDigitaCampo: TStringField;
    QryExameItensSeqMinimo: TFloatField;
    QryExameItensSeqMaximo: TFloatField;
    QryExameItensSeqObrigatorio: TStringField;
    QryExameItensSeqTipoCampo: TStringField;
    QryExamesItensCasasDecimais1: TIntegerField;
    QryExamesItensCasasDecimais2: TIntegerField;
    QryExamesItensTipoCampo2: TStringField;
    RxDBComboBox2: TRxDBComboBox;
    Label22: TLabel;
    Label23: TLabel;
    DBEdit13: TDBEdit;
    Label24: TLabel;
    DBEdit14: TDBEdit;
    Label25: TLabel;
    bbtnTransfere: TBitBtn;
    TSTransfere: TTabSheet;
    Panel12: TPanel;
    BitBtn2: TBitBtn;
    BitBtn3: TBitBtn;
    Panel13: TPanel;
    Panel14: TPanel;
    Label26: TLabel;
    CheckListBox1: TCheckListBox;
    RxDBLookupCombo1: TRxDBLookupCombo;
    Label27: TLabel;
    CheckBox1: TCheckBox;
    SPINSExame: TStoredProc;
    SPINSItens: TStoredProc;
    QryExamesItensFormula: TStringField;
    QryExamesItensOrigemCalculo: TStringField;
    QryExamesItensCodPai: TIntegerField;
    QryExamesItensPercFormula: TFloatField;
    Label28: TLabel;
    RxDBComboBox3: TRxDBComboBox;
    Label29: TLabel;
    RxDBComboBox4: TRxDBComboBox;
    QryOrigem: TQuery;
    IntegerField1: TIntegerField;
    StringField1: TStringField;
    StringField2: TStringField;
    StringField3: TStringField;
    StringField4: TStringField;
    FloatField1: TFloatField;
    FloatField2: TFloatField;
    StringField5: TStringField;
    StringField6: TStringField;
    AutoIncField1: TAutoIncField;
    IntegerField2: TIntegerField;
    StringField7: TStringField;
    StringField8: TStringField;
    IntegerField3: TIntegerField;
    IntegerField4: TIntegerField;
    StringField9: TStringField;
    StringField10: TStringField;
    StringField11: TStringField;
    IntegerField5: TIntegerField;
    FloatField3: TFloatField;
    DSOrigem: TDataSource;
    RxDBLookupCombo4: TRxDBLookupCombo;
    Label30: TLabel;
    DBEdit15: TDBEdit;
    Label31: TLabel;
    procedure FormClose(Sender: TObject; var Action: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure FormActivate(Sender: TObject);
    procedure BbtnPesquisarClick(Sender: TObject);
    procedure BBtnIncluirClick(Sender: TObject);
    procedure BBtnAlterarClick(Sender: TObject);
    procedure BbtnExcluirClick(Sender: TObject);
    procedure BBtnFechatClick(Sender: TObject);
    procedure BBtnGravarClick(Sender: TObject);
    procedure BBtnCancelarClick(Sender: TObject);
    procedure DSQualquerDataChange(Sender: TObject; Field: TField);
    procedure BbtnIncluirItensClick(Sender: TObject);
    procedure BbtnAlterarItensClick(Sender: TObject);
    procedure BbtnExcluirItensClick(Sender: TObject);
    procedure BitBtn1Click(Sender: TObject);
    procedure BbtnCancelaItensClick(Sender: TObject);
    procedure bbtnTransfereClick(Sender: TObject);
    procedure CheckBox1Click(Sender: TObject);
    procedure BitBtn3Click(Sender: TObject);
    procedure BitBtn2Click(Sender: TObject);
    procedure RxDBComboBox3Change(Sender: TObject);
    procedure RxDBComboBox4Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  FrmExamesParam: TFrmExamesParam;

implementation

{$R *.dfm}

procedure TFrmExamesParam.FormClose(Sender: TObject;
  var Action: TCloseAction);
begin
   Release;
   FrmExamesParam := nil;
end;

procedure TFrmExamesParam.FormCreate(Sender: TObject);
begin
   TSPesquisa.TabVisible := False;
   TSManutencao.TabVisible := False;
   TSItens.TabVisible := False;
   TSTransfere.TabVisible := False;
   PageControl1.ActivePage := TSPesquisa;
   BbtnTransfere.Caption := 'Transfere Outra'+#13+'Espécie';
end;

procedure TFrmExamesParam.FormActivate(Sender: TObject);
begin
   QryQualquer.Close;
   QryEspecie.Close;
   QryEspecie.Active := True;
   RxDBLookupCombo2.KeyValue := QryEspecieCodEspecie.Value;
   BbtnINcluir.Enabled := False;
   BbtnAlterar.Enabled := False;
   BbtnExcluir.Enabled := False;
   BbtnImprimir.Enabled := False;
   BbtnIncluiritens.Enabled := False;
   BbtnExcluirItens.Enabled := False;
   BbtnAlterarItens.Enabled := False;
   BbtnTransfere.Enabled := False;

//   RAdioGroup1.ItemIndex := 0;

end;

procedure TFrmExamesParam.BbtnPesquisarClick(Sender: TObject);
begin
   QryQualquer.Close;
   QryQualquer.ParamByName('Nome').Value := TRIM(EdNome.Text)+'%';
   QryQualquer.ParamByName('CodEspecie').Value := RxDBLookupCombo2.KeyValue;
   QryQualquer.Active := True;
   if qryqualquer.Eof then
   begin
      BbtnINcluir.Enabled := True;
      BbtnAlterar.Enabled := False;
      BbtnExcluir.Enabled := False;
      BbtnImprimir.Enabled := False;
      BbtnTransfere.Enabled := False;
   end
   else
   begin
       BbtnINcluir.Enabled := True;
       BbtnAlterar.Enabled := True;
       BbtnExcluir.Enabled := True;
       BbtnImprimir.Enabled := True;
       BbtnTransfere.Enabled := True;
   end;




end;

procedure TFrmExamesParam.BBtnIncluirClick(Sender: TObject);
begin
   QryQualquer.Insert;
   DBCheckBox1.Checked;
   QryQualquerImprimirSeparado.Value := 'S';
   IF RxDBLookupCombo2.KeyValue > 0 then
      QryQualquerCodEspecie.Value := RxDBLookupCombo2.KeyValue;
   PageControl1.ActivePage := TSManutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmExamesParam.BBtnAlterarClick(Sender: TObject);
begin
   QryQualquer.Edit;
   PageControl1.ActivePage := TSMAnutencao;
   DbEdit1.SetFocus;
   Panel1.Enabled := False;

end;

procedure TFrmExamesParam.BbtnExcluirClick(Sender: TObject);
begin
   if ((QryQualquer.Eof) and (QryQualquer.RecNo = 0)) then
      ShowMessage('Último Encontrado, Pesquise Novamente')
  else
     if Application.MessageBox('Deseja excluir ? ',
         'Confirme', 4  + MB_ICONQUESTION)= idYes then
     begin
        try
           QryQualquer.Delete;
           QryQualquer.ApplyUpdates;
           QryQualquer.Close;
           QryQualquer.Active := true;
        except
           ShowMessage('Exclusão Proibida, Cadastro já Utilizado..');
           QryQualquer.Close;
           QryQualquer.Active := true;
        end;
     end;


end;

procedure TFrmExamesParam.BBtnFechatClick(Sender: TObject);
begin
   close;
end;

procedure TFrmExamesParam.BBtnGravarClick(Sender: TObject);
begin
   IF QryQualquerCodEspecie.Value <= 0 then
   begin
      ShowMessage('Selecione a Espécie.');
      RxDBLookupCombo3.SetFocus;
      exit;
   end;

   IF Length(QryQualquerNomeExame.Value) <= 0 then
   begin
      ShowMessage('Preencha  o  Nome do Exame.');
      DbEdit1.SetFocus;
      exit;
   end;
   IF Length(QryQualquerNomeExameReduz.Value) <= 0 then
   begin
      ShowMessage('Preencha  o  Nome do Exame Reduzido.');
      DbEdit2.SetFocus;
      exit;
   end;
   IF QryQualquerDias_Elaboracao_Exame.Value < 0 then
   begin
      ShowMessage('Preencha  o  Dias para Elaboração do Exame.');
      DbEdit3.SetFocus;
      exit;
   end;

   IF QryQualquerValor.Value <= 0 then
   begin
      ShowMessage('Preencha  o  Valor do Exame.');
      RxDBCalcEdit1.SetFocus;
      exit;
   end;


   QryQualquerEspecie.Value := QryEspecieNomeEspecie.Value;
//   EdNome.Text := QryQualquerNomeExame.Value;
   QryQualquer.Post;
   QryQualquer.ApplyUpdates;
//   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
//   BbtnPesquisar.Click;




end;

procedure TFrmExamesParam.BBtnCancelarClick(Sender: TObject);
begin
   QryQualquer.Cancel;
   QryQualquer.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;

end;

procedure TFrmExamesParam.DSQualquerDataChange(Sender: TObject;
  Field: TField);
begin
   If QryQualquer.Active then
   begin
      QryExamesItens.Close;
      QryExamesItens.ParamByName('CodExame').Value := QryQualquerCodExame.Value;
      QryExamesItens.Active := True;
      IF QryExamesItens.Eof then
      begin
         BbtnIncluiritens.Enabled := True;
         BbtnExcluirItens.Enabled := False;
         BbtnAlterarItens.Enabled := False;
      end
      else
      begin
         BbtnIncluiritens.Enabled := True;
         BbtnExcluirItens.Enabled := True;
         BbtnAlterarItens.Enabled := True;
      end;
    end;


end;

procedure TFrmExamesParam.BbtnIncluirItensClick(Sender: TObject);
begin
// Carrega Ultimo Itens Lançado...
   QryExameItensSeq.Close;
   QryExameItensSeq.ParamByName('CodExame').Value := QryQualquerCodExame.Value;
   QryExameItensSeq.Active := True;
   if QryExameItensSeq.Eof then
      SpinEdit1.Value := 1
   else
      SpinEdit1.Value := QryExameItensSeqOrdemApresentacao.Value+1;
///////////////
   QryExamesItens.Insert;
   RxDBComboBox1.ItemIndex := 0;
   QryExamesItensTipoCampo.Value := 'N';
   DBCheckBox2.Checked := true;
   QryExamesItensDigitaCampo.Value := 'S';
   DBCheckBox3.Checked := True;
   QryExamesItensObrigatorio.Value := 'S';
   QryExamesItensFormula.Value := 'N';
   RXdbComboBox3.ItemIndex := 0;
   Label29.Visible := False;
   RXDBComboBox4.Visible := False;
   RxDBLookupCombo4.Visible := False;
   label30.Visible := False;
   Label31.Visible := False;
   DbEdit15.Visible := False;
   QryExamesItensCodExame.Value := QryQualquerCodExame.Value;
   Label19.Caption := QryQualquerNomeExame.Value;
   PageControl1.ActivePage := TSItens;
   SpinEdit1.SetFocus;
   Panel1.Enabled := False;
end;

procedure TFrmExamesParam.BbtnAlterarItensClick(Sender: TObject);
begin
   QryExamesItens.Edit;
   Label19.Caption := QryQualquerNomeExame.Value;
   SpinEdit1.Value := QryExamesItensOrdemApresentacao.Value;
   PageControl1.ActivePage := TSItens;
   DbEdit6.SetFocus;
   If QryExamesitensFormula.IsNull then
   begin
      QryExamesItensFormula.Value := 'N';
      RXDBComboBox3.ItemIndex := 0;
   end;
   IF QryExamesItensTipoCampo.Value = 'N' then
      RXDBCombobox1.ItemIndex := 0;
   IF QryExamesItensTipoCampo.Value = 'T' then
      RXDBCombobox1.ItemIndex := 1;
   IF QryExamesItensTipoCampo.Value = 'S' then
      RXDBCombobox1.ItemIndex := 2;


   Panel1.Enabled := False;
   If QryExamesItensFormula.Value = 'S' then
   begin
      RXDBComboBox3.ItemIndex := 1;
      If QryExamesItensOrigemCalculo.Value = 'S' then
      begin
         Label29.Visible := True;
         RXDBComboBox4.Visible := True;
         RXDBComboBox4.ItemIndex := 1;
         RxDBLookupCombo4.Visible := False;
         label30.Visible := False;
         Label31.Visible := False;
         DbEdit15.Visible := False;
      end
      else
      begin
         RXDBComboBox4.ItemIndex := 0;
         Label29.Visible := True;
         RXDBComboBox4.Visible := True;
         RxDBLookupCombo4.Visible := True;
         label30.Visible := True;
         RxDBLookupCombo4.Visible := True;
         label30.Visible := True;
         Label31.Visible := true;
         DbEdit15.Visible := True;
         QryOrigem.Close;
         Qryorigem.ParamByName('CodExame').Value := QryQualquerCodExame.Value;
         Qryorigem.Active := True;

      end;

   end
   else
   begin
      Label29.Visible := False;
      RXDBComboBox4.Visible := False;
      RxDBLookupCombo4.Visible := False;
      label30.Visible := False;

      RxDBLookupCombo4.Visible := False;
      label30.Visible := False;
      Label31.Visible := False;
      DbEdit15.Visible := False;

   end;

end;

procedure TFrmExamesParam.BbtnExcluirItensClick(Sender: TObject);
begin
   if ((QryExamesItens.Eof) and (QryExamesItens.RecNo = 0)) then
      ShowMessage('Último Encontrado, Pesquise Novamente')
  else
     if Application.MessageBox('Deseja excluir ? ',
         'Confirme', 4  + MB_ICONQUESTION)= idYes then
     begin
        try
           QryExamesItens.Delete;
           QryExamesItens.ApplyUpdates;
           QryExamesItens.Close;
           QryExamesItens.Active := true;
        except
           ShowMessage('Exclusão Proibida, Cadastro já Utilizado..');
           QryExamesItens.Close;
           QryExamesItens.Active := true;
        end;
     end;


end;

procedure TFrmExamesParam.BitBtn1Click(Sender: TObject);
begin
   QryExamesItensOrdemApresentacao.Value := SpinEdit1.Value;
   IF QryExamesItensOrdemApresentacao.Value <= 0 then
   begin
      ShowMessage('Selecione uma posição no Item do Exame.');
      SpinEdit1.SetFocus;
      exit;
   end;


   QryExamesItens.Post;
   QryExamesItens.ApplyUpdates;
//   QryExamesItens.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
 //  BbtnPesquisar.Click;

end;

procedure TFrmExamesParam.BbtnCancelaItensClick(Sender: TObject);
begin
   QryExamesItens.Cancel;
   QryExamesItens.Close;
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;
end;

procedure TFrmExamesParam.bbtnTransfereClick(Sender: TObject);
var
  codespecie : integer;
begin

   PageControl1.ActivePage := TSTransfere;
   Panel1.Enabled := False;
   RxDBLookupCombo1.KeyValue := QryQualquerCodExame.Value;
   Checklistbox1.Items.Clear;
   CodEspecie := QryQualquerCodEspecie.Value;
   QryEspecie.First;
   While not qryespecie.Eof do
   begin
      IF QryEspecieCodEspecie.Value <> codEspecie then
      begin
         CheckListBox1.Items.Add(copy(inttostr(QryEspecieCodEspecie.value)+'                    ',1,15)+' '+QryEspecieNomeEspecie.Value);
      end;
      QryEspecie.Next;
   end;


end;

procedure TFrmExamesParam.CheckBox1Click(Sender: TObject);
Var
   i, total: integer;
begin
  total:= Checklistbox1.Items.Capacity - 1;
   if Checkbox1.Checked then
   begin
      CheckListBox1.Enabled := false;
      for i := 0 to total do
      begin
         checklistbox1.Checked[i] := true;
      end;
   end
   else
   begin
      CheckListBox1.Enabled := true;
      for i := 0 to total do
      begin
         checklistbox1.Checked[i] := false;
      end;
   end;


end;

procedure TFrmExamesParam.BitBtn3Click(Sender: TObject);
begin
   PageControl1.ActivePage := TSPesquisa;
   Panel1.Enabled := True;
   BbtnPesquisar.Click;
end;

procedure TFrmExamesParam.BitBtn2Click(Sender: TObject);
Var
   i, total, codexame: integer;
begin
  total:= Checklistbox1.Items.Capacity - 1;
  for i := 0 to total do
  begin
    If checklistbox1.Checked[i] then
    begin
      QryExamesItens.First;
      SPInsExame.Prepare;
      With SPInsExame do
      begin
          ParamByname('@Valor_5').Value := QryQualquerValor.Value;
          ParamByname('@CodEspecie_6').Value := strtoint(trim(copy(checklistbox1.Items.Strings[i],1,10)));
          ParamByname('@NomeExame_7').Value := QryQualquerNomeExame.Value;
          ParamByname('@NomeExameReduz_8').Value := QryQualquerNomeExameReduz.Value;
          ParamByname('@Dias_Elaboracao_Exame_9').Value := QryQualquerDias_Elaboracao_Exame.Value;
          ParamByname('@ImprimirSeparado_10').Value := QryQualquerImprimirSeparado.Value;
          ParamByname('@Metodo_11').Value := QryQualquerMetodo.Value;
          ParamByname('@Material_12').Value := QryQualquerMaterial.Value;
          execproc;
          CodExame := Parambyname('@CodExame_3').Value;
      end;
      While not QryExamesItens.Eof do
      begin
         SPInsItens.Prepare;
         With SPInsItens do
         begin
            ParamByname('@CodExame_3').Value := CodExame;
            ParamByname('@OrdemApresentacao_8').Value := QryExamesItensOrdemApresentacao.Value;
            ParamByname('@NomeItemExame_9').Value := QryExamesItensNomeItemExame.Value;
            ParamByname('@Referencia1_10').Value := QryExamesItensReferencia1.Value;
            ParamByname('@Referencia2_11').Value := QryExamesItensReferencia2.Value;
            ParamByname('@Unidade1_12').Value := QryExamesItensUnidade1.Value;
            ParamByname('@unidade2_18').Value := QryExamesItensUnidade2.Value;
            ParamByname('@DigitaCampo_13').Value := QryExamesItensDigitacampo.Value;
            ParamByname('@Obrigatorio_14').Value := QryExamesItensObrigatorio.Value;
            ParamByname('@TipoCampo_15').Value := QryExamesItensTipoCampo.Value;
            ParamByname('@Maximo_16').Value := QryExamesItensMaximo.Value;
            ParamByname('@Minimo_17').Value := QryExamesItensminimo.Value;
            ParamByname('@CasasDecimais1_19').Value := QryExamesItensCasasDecimais1.Value;
            ParamByname('@CasasDecimais2_20').Value := QryExamesItensCasasDecimais2.Value;
            ParamByname('@TipoCampo2_21').Value := QryExamesItensTipoCampo2.Value;
            execproc;
         end;
         qryExamesItens.Next;
       end;  
    end;
  end;
  ShowMessage('Transferência Realizada com Sucesso....');
  Panel1.Enabled := True;
  BbtnPesquisar.Click;
  PageControl1.ActivePage := TsPesquisa;




end;

procedure TFrmExamesParam.RxDBComboBox3Change(Sender: TObject);
begin
   IF RXDBComboBox3.ItemIndex = 1 then
   begin
      IF RXDBCombobox1.ItemIndex > 0 then
      begin
         ShowMessage('Para Fórmula Tipo de Campo tem que ser Númerico');
         RXDBComboBox3.ItemIndex := 0;
         RXDBComboBox3.SetFocus;
      end;
       Label29.Visible := True;
      RXDBComboBox4.Visible := True;
   end
   else
   begin
      Label29.Visible := False;
      RXDBComboBox4.Visible := False;
   end;
end;

procedure TFrmExamesParam.RxDBComboBox4Click(Sender: TObject);
begin
    IF RXDBComboBox4.ItemIndex = 0 then
    begin
       Qryorigem.Close;
       QryOrigem.ParamByName('CodExame').Value := QryQualquerCodExame.Value;
       QryOrigem.Active := True;
       If QryOrigem.Eof then
       begin
          ShowMessage('Primeiro Cadastre um exame como Base de Cálculo.');
          RxDbComboBox4.ItemIndex := 1;
          RxDbcombobox4.SetFocus;
       end;
       RxDBLookupCombo4.Visible := True;
       label30.Visible := True;
       Label31.Visible := True;
       DbEdit15.Visible := True;
    end
    else
    begin
       RxDBLookupCombo4.Visible := False;
       label30.Visible := False;
       Label31.Visible := False;
       DbEdit15.Visible := False;


    end;
end;

end.
