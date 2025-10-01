object FrmFechamento: TFrmFechamento
  Left = 13
  Top = 100
  Width = 987
  Height = 532
  Caption = 'Fechamento do Faturamento por Cl'#237'nica'
  Color = clBtnFace
  Font.Charset = ANSI_CHARSET
  Font.Color = clWindowText
  Font.Height = -13
  Font.Name = 'Arial'
  Font.Style = []
  OldCreateOrder = False
  OnActivate = FormActivate
  OnClose = FormClose
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 16
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 971
    Height = 105
    Align = alTop
    TabOrder = 0
    object Label9: TLabel
      Left = 13
      Top = 22
      Width = 104
      Height = 16
      Caption = 'Cl'#237'nica Veterin'#225'ria'
    end
    object BbtnPesquisar: TBitBtn
      Left = 816
      Top = 32
      Width = 145
      Height = 49
      Cursor = crHandPoint
      Caption = '&Efetua Fechamento'
      TabOrder = 0
      OnClick = BbtnPesquisarClick
      Glyph.Data = {
        76010000424D7601000000000000760000002800000020000000100000000100
        04000000000000010000120B0000120B00001000000000000000000000000000
        800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00555555555555
        555555555555555555555555555555555555555555FF55555555555559055555
        55555555577FF5555555555599905555555555557777F5555555555599905555
        555555557777FF5555555559999905555555555777777F555555559999990555
        5555557777777FF5555557990599905555555777757777F55555790555599055
        55557775555777FF5555555555599905555555555557777F5555555555559905
        555555555555777FF5555555555559905555555555555777FF55555555555579
        05555555555555777FF5555555555557905555555555555777FF555555555555
        5990555555555555577755555555555555555555555555555555}
      NumGlyphs = 2
    end
    object RxDBLookupCombo2: TRxDBLookupCombo
      Left = 121
      Top = 17
      Width = 448
      Height = 23
      DropDownCount = 8
      LookupField = 'CodCliente'
      LookupDisplay = 'nome'
      LookupSource = DSClinica
      TabOrder = 1
    end
    object GroupBox2: TGroupBox
      Left = 577
      Top = 11
      Width = 231
      Height = 68
      Caption = 'Todos n'#227'o Faturados At'#233' a Data'
      TabOrder = 2
      object Label23: TLabel
        Left = 16
        Top = 18
        Width = 107
        Height = 16
        Caption = 'At'#233' para Apura'#231#227'o'
      end
      object Dtf: TDateEdit
        Left = 16
        Top = 40
        Width = 97
        Height = 21
        NumGlyphs = 2
        TabOrder = 0
      end
    end
  end
  object Panel2: TPanel
    Left = 0
    Top = 105
    Width = 971
    Height = 389
    Align = alClient
    Caption = 'Panel2'
    TabOrder = 1
    object PageControl1: TPageControl
      Left = 1
      Top = 1
      Width = 969
      Height = 387
      ActivePage = TabSheet1
      Align = alClient
      TabOrder = 0
      object TabSheet1: TTabSheet
        Caption = 'TabSheet1'
        object Panel3: TPanel
          Left = 841
          Top = 0
          Width = 120
          Height = 356
          Align = alRight
          TabOrder = 0
          object BBtnIncluir: TBitBtn
            Left = 2
            Top = 2
            Width = 118
            Height = 71
            Cursor = crHandPoint
            Caption = '&Lan'#231'a Contas a Pagar'
            TabOrder = 0
            OnClick = BBtnIncluirClick
            Glyph.Data = {
              76010000424D7601000000000000760000002800000020000000100000000100
              04000000000000010000130B0000130B00001000000000000000000000000000
              800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF0033333333B333
              333B33FF33337F3333F73BB3777BB7777BB3377FFFF77FFFF77333B000000000
              0B3333777777777777333330FFFFFFFF07333337F33333337F333330FFFFFFFF
              07333337F33333337F333330FFFFFFFF07333337F33333337F333330FFFFFFFF
              07333FF7F33333337FFFBBB0FFFFFFFF0BB37777F3333333777F3BB0FFFFFFFF
              0BBB3777F3333FFF77773330FFFF000003333337F333777773333330FFFF0FF0
              33333337F3337F37F3333330FFFF0F0B33333337F3337F77FF333330FFFF003B
              B3333337FFFF77377FF333B000000333BB33337777777F3377FF3BB3333BB333
              3BB33773333773333773B333333B3333333B7333333733333337}
            Layout = blGlyphTop
            NumGlyphs = 2
          end
          object BBtnFechat: TBitBtn
            Left = 2
            Top = 129
            Width = 118
            Height = 62
            Cursor = crHandPoint
            Caption = '&Fechar'
            TabOrder = 1
            OnClick = BBtnFechatClick
            Glyph.Data = {
              76010000424D7601000000000000760000002800000020000000100000000100
              04000000000000010000120B0000120B00001000000000000000000000000000
              800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00330000000000
              03333377777777777F333301BBBBBBBB033333773F3333337F3333011BBBBBBB
              0333337F73F333337F33330111BBBBBB0333337F373F33337F333301110BBBBB
              0333337F337F33337F333301110BBBBB0333337F337F33337F333301110BBBBB
              0333337F337F33337F333301110BBBBB0333337F337F33337F333301110BBBBB
              0333337F337F33337F333301110BBBBB0333337F337FF3337F33330111B0BBBB
              0333337F337733337F333301110BBBBB0333337F337F33337F333301110BBBBB
              0333337F3F7F33337F333301E10BBBBB0333337F7F7F33337F333301EE0BBBBB
              0333337F777FFFFF7F3333000000000003333377777777777333}
            Layout = blGlyphTop
            NumGlyphs = 2
          end
        end
        object Panel4: TPanel
          Left = 0
          Top = 0
          Width = 841
          Height = 356
          Align = alClient
          Caption = 'Panel4'
          TabOrder = 1
          object Panel6: TPanel
            Left = 1
            Top = 1
            Width = 839
            Height = 52
            Align = alTop
            TabOrder = 0
            object Label2: TLabel
              Left = 272
              Top = 8
              Width = 17
              Height = 16
              Caption = '....'
              Font.Charset = DEFAULT_CHARSET
              Font.Color = clMaroon
              Font.Height = -13
              Font.Name = 'MS Sans Serif'
              Font.Style = [fsBold]
              ParentFont = False
            end
            object Label1: TLabel
              Left = 2
              Top = 37
              Width = 69
              Height = 14
              Caption = 'C'#243'digo Interno'
              Font.Charset = ANSI_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'Arial'
              Font.Style = []
              ParentFont = False
            end
            object Label3: TLabel
              Left = 82
              Top = 36
              Width = 67
              Height = 14
              Caption = 'C'#243'digo Cl'#237'nica'
              Font.Charset = ANSI_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'Arial'
              Font.Style = []
              ParentFont = False
            end
            object Label4: TLabel
              Left = 158
              Top = 37
              Width = 76
              Height = 14
              Caption = 'Nome do Animal'
              Font.Charset = ANSI_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'Arial'
              Font.Style = []
              ParentFont = False
            end
            object Label5: TLabel
              Left = 383
              Top = 36
              Width = 32
              Height = 14
              Caption = 'Exame'
              Font.Charset = ANSI_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'Arial'
              Font.Style = []
              ParentFont = False
            end
            object Label6: TLabel
              Left = 663
              Top = 36
              Width = 57
              Height = 14
              Caption = 'Data Pedido'
              Font.Charset = ANSI_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'Arial'
              Font.Style = []
              ParentFont = False
            end
            object Label7: TLabel
              Left = 751
              Top = 36
              Width = 25
              Height = 14
              Caption = 'Valor'
              Font.Charset = ANSI_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'Arial'
              Font.Style = []
              ParentFont = False
            end
            object CheckBox1: TCheckBox
              Left = 8
              Top = 8
              Width = 97
              Height = 17
              Caption = 'Todos'
              Checked = True
              State = cbChecked
              TabOrder = 0
              OnClick = CheckBox1Click
            end
          end
          object StatusBar1: TStatusBar
            Left = 1
            Top = 336
            Width = 839
            Height = 19
            Panels = <
              item
                Width = 50
              end
              item
                Width = 50
              end>
          end
          object CheckListBox1: TCheckListBox
            Left = 1
            Top = 53
            Width = 839
            Height = 283
            Align = alClient
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -12
            Font.Name = 'Courier New'
            Font.Style = []
            ItemHeight = 15
            ParentFont = False
            TabOrder = 2
            OnClick = CheckListBox1Click
          end
        end
      end
      object TabSheet2: TTabSheet
        Caption = 'TabSheet2'
        ImageIndex = 1
        object Panel5: TPanel
          Left = 0
          Top = 0
          Width = 841
          Height = 356
          Align = alClient
          TabOrder = 0
          object Label8: TLabel
            Left = 17
            Top = 16
            Width = 58
            Height = 16
            Caption = 'Descri'#231#227'o'
            FocusControl = DBEdit1
          end
          object Label10: TLabel
            Left = 17
            Top = 62
            Width = 82
            Height = 16
            Caption = 'Data Emiss'#227'o'
          end
          object Label15: TLabel
            Left = 18
            Top = 104
            Width = 80
            Height = 16
            Caption = 'Valor Apurado'
          end
          object Label16: TLabel
            Left = 161
            Top = 62
            Width = 99
            Height = 16
            Caption = 'Data Vencimento'
          end
          object Label11: TLabel
            Left = 154
            Top = 104
            Width = 55
            Height = 16
            Caption = 'Desconto'
          end
          object Label17: TLabel
            Left = 482
            Top = 104
            Width = 88
            Height = 16
            Caption = 'Valor da Fatura'
          end
          object Label12: TLabel
            Left = 17
            Top = 152
            Width = 104
            Height = 16
            Caption = 'N'#186' Titulo Banc'#225'rio'
            FocusControl = DBEdit2
          end
          object Label13: TLabel
            Left = 17
            Top = 200
            Width = 68
            Height = 16
            Caption = 'Observa'#231#227'o'
            FocusControl = DBEdit3
          end
          object Label14: TLabel
            Left = 17
            Top = 248
            Width = 83
            Height = 16
            Caption = 'Banco / Conta'
            FocusControl = DBEdit3
          end
          object Label18: TLabel
            Left = 17
            Top = 296
            Width = 179
            Height = 16
            Caption = 'Responsavel Pelo Fechamento'
            FocusControl = DBEdit3
          end
          object Label19: TLabel
            Left = 290
            Top = 58
            Width = 55
            Height = 16
            Caption = 'Desconto'
            FocusControl = DBEdit3
          end
          object Label20: TLabel
            Left = 368
            Top = 104
            Width = 104
            Height = 16
            Caption = 'Valor Desconto %'
          end
          object Label21: TLabel
            Left = 285
            Top = 104
            Width = 71
            Height = 16
            Caption = '% Desconto'
          end
          object Label22: TLabel
            Left = 301
            Top = 124
            Width = 7
            Height = 16
            Caption = '0'
          end
          object DBEdit1: TDBEdit
            Left = 17
            Top = 32
            Width = 394
            Height = 24
            DataField = 'DESCRICAO'
            DataSource = DsContas
            TabOrder = 0
          end
          object DBDateEdit1: TDBDateEdit
            Left = 16
            Top = 78
            Width = 121
            Height = 21
            DataField = 'DTEMISSAO'
            DataSource = DsContas
            NumGlyphs = 2
            TabOrder = 1
          end
          object DBDateEdit2: TDBDateEdit
            Left = 160
            Top = 78
            Width = 121
            Height = 21
            DataField = 'DTVENC'
            DataSource = DsContas
            NumGlyphs = 2
            TabOrder = 2
          end
          object RxDBCalcEdit1: TRxDBCalcEdit
            Left = 16
            Top = 120
            Width = 121
            Height = 21
            DataField = 'VLCAlCULADO'
            DataSource = DsContas
            DisplayFormat = ',0.00'
            Enabled = False
            NumGlyphs = 2
            TabOrder = 3
          end
          object RxDBCalcEdit2: TRxDBCalcEdit
            Left = 152
            Top = 120
            Width = 121
            Height = 21
            DataField = 'VLDESCONTO'
            DataSource = DsContas
            DisplayFormat = ',0.00'
            NumGlyphs = 2
            TabOrder = 4
            OnChange = RxDBCalcEdit2Change
            OnExit = RxDBCalcEdit2Change
          end
          object RxDBCalcEdit3: TRxDBCalcEdit
            Left = 480
            Top = 120
            Width = 121
            Height = 21
            DataField = 'VLFATURA'
            DataSource = DsContas
            DisplayFormat = ',0.00'
            Enabled = False
            NumGlyphs = 2
            TabOrder = 5
          end
          object DBEdit2: TDBEdit
            Left = 17
            Top = 168
            Width = 394
            Height = 24
            DataField = 'NDOCTIT'
            DataSource = DsContas
            TabOrder = 6
          end
          object DBEdit3: TDBEdit
            Left = 17
            Top = 216
            Width = 394
            Height = 24
            DataField = 'DESCR'
            DataSource = DsContas
            TabOrder = 7
          end
          object RxDBLookupCombo1: TRxDBLookupCombo
            Left = 16
            Top = 268
            Width = 825
            Height = 23
            DropDownCount = 8
            DataField = 'CODBANCO'
            DataSource = DsContas
            LookupField = 'CODBANCO'
            LookupDisplay = 'NOMEBANCO;NUMAGENCIA;NUMCONTA'
            LookupSource = DSBanco
            TabOrder = 8
          end
          object RxDBLookupCombo3: TRxDBLookupCombo
            Left = 16
            Top = 316
            Width = 825
            Height = 23
            DropDownCount = 8
            DataField = 'CodRespProf'
            DataSource = DsContas
            LookupField = 'CodProfLaudo'
            LookupDisplay = 'NomeProfLaudo'
            LookupSource = DsProfResp
            TabOrder = 9
          end
          object RxDBLookupCombo4: TRxDBLookupCombo
            Left = 288
            Top = 76
            Width = 409
            Height = 23
            DropDownCount = 8
            DataField = 'CODDESCONTO'
            DataSource = DsContas
            LookupField = 'CODDESCONTO'
            LookupDisplay = 'Nome'
            LookupSource = DsDesconto
            TabOrder = 10
            OnChange = RxDBLookupCombo4Change
          end
          object RxCalcEdit1: TRxCalcEdit
            Left = 368
            Top = 120
            Width = 97
            Height = 21
            AutoSize = False
            DisplayFormat = ',0.00'
            Enabled = False
            NumGlyphs = 2
            TabOrder = 11
          end
        end
        object Panel8: TPanel
          Left = 841
          Top = 0
          Width = 120
          Height = 356
          Align = alRight
          TabOrder = 1
          object BitBtn1: TBitBtn
            Left = 2
            Top = 2
            Width = 118
            Height = 71
            Cursor = crHandPoint
            Caption = '&Gravar '
            TabOrder = 0
            OnClick = BitBtn1Click
            Glyph.Data = {
              76010000424D7601000000000000760000002800000020000000100000000100
              04000000000000010000130B0000130B00001000000000000000000000000000
              800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00333333330070
              7700333333337777777733333333008088003333333377F73377333333330088
              88003333333377FFFF7733333333000000003FFFFFFF77777777000000000000
              000077777777777777770FFFFFFF0FFFFFF07F3333337F3333370FFFFFFF0FFF
              FFF07F3FF3FF7FFFFFF70F00F0080CCC9CC07F773773777777770FFFFFFFF039
              99337F3FFFF3F7F777F30F0000F0F09999937F7777373777777F0FFFFFFFF999
              99997F3FF3FFF77777770F00F000003999337F773777773777F30FFFF0FF0339
              99337F3FF7F3733777F30F08F0F0337999337F7737F73F7777330FFFF0039999
              93337FFFF7737777733300000033333333337777773333333333}
            Layout = blGlyphTop
            NumGlyphs = 2
          end
          object BbtnCancelar: TBitBtn
            Left = 2
            Top = 73
            Width = 118
            Height = 62
            Cursor = crHandPoint
            Caption = '&Cancelar'
            TabOrder = 1
            OnClick = BbtnCancelarClick
            Glyph.Data = {
              76010000424D7601000000000000760000002800000020000000100000000100
              04000000000000010000120B0000120B00001000000000000000000000000000
              800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00330000000000
              03333377777777777F333301BBBBBBBB033333773F3333337F3333011BBBBBBB
              0333337F73F333337F33330111BBBBBB0333337F373F33337F333301110BBBBB
              0333337F337F33337F333301110BBBBB0333337F337F33337F333301110BBBBB
              0333337F337F33337F333301110BBBBB0333337F337F33337F333301110BBBBB
              0333337F337F33337F333301110BBBBB0333337F337FF3337F33330111B0BBBB
              0333337F337733337F333301110BBBBB0333337F337F33337F333301110BBBBB
              0333337F3F7F33337F333301E10BBBBB0333337F7F7F33337F333301EE0BBBBB
              0333337F777FFFFF7F3333000000000003333377777777777333}
            Layout = blGlyphTop
            NumGlyphs = 2
          end
        end
      end
    end
  end
  object QryCliente: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select  c.CodCliente, c.nome, count(*) as teste'
      'From MovPedido MP '
      '     Inner Join MovExames M On mp.codmovpedido = m.codmovpedido'
      '     Inner Join Cliente c on mp.codcliente = c.codcliente'
      'Where '
      ''
      '   Mp.CodSeqContas is null'
      ''
      'Group By  c.CodCliente, c.nome  '
      'order by c.nome')
    Left = 605
    Top = 202
    object QryClienteCodCliente: TAutoIncField
      FieldName = 'CodCliente'
    end
    object QryClientenome: TStringField
      FieldName = 'nome'
      FixedChar = True
      Size = 50
    end
    object QryClienteteste: TIntegerField
      FieldName = 'teste'
    end
  end
  object DSClinica: TDataSource
    AutoEdit = False
    DataSet = QryCliente
    Left = 645
    Top = 202
  end
  object QryFechamento: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From MovPedido MP '
      '     Inner Join MovExames M On mp.codmovpedido = m.codmovpedido'
      'Where Mp.CodCliente = :CodCliente'
      'and'
      '   Mp.datapedido <= :dtf'
      'and '
      '   Mp.CodSeqContas is null'
      ''
      '   '
      'order by CodigoPedido')
    Left = 573
    Top = 90
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodCliente'
        ParamType = ptInput
      end
      item
        DataType = ftDate
        Name = 'dtf'
        ParamType = ptInput
      end>
    object QryFechamentoCodMovPedido: TAutoIncField
      FieldName = 'CodMovPedido'
      Origin = 'DNLABVET.MovPedido.CodMovPedido'
    end
    object QryFechamentoCodigoInterno: TStringField
      FieldName = 'CodigoInterno'
      Origin = 'DNLABVET.MovPedido.CodigoInterno'
      FixedChar = True
    end
    object QryFechamentoCodigoPedido: TIntegerField
      FieldName = 'CodigoPedido'
      Origin = 'DNLABVET.MovPedido.CodigoPedido'
    end
    object QryFechamentoSenha: TStringField
      FieldName = 'Senha'
      Origin = 'DNLABVET.MovPedido.Senha'
      FixedChar = True
    end
    object QryFechamentoCodCliente: TIntegerField
      FieldName = 'CodCliente'
      Origin = 'DNLABVET.MovPedido.CodCliente'
    end
    object QryFechamentoCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.MovPedido.CodEspecie'
    end
    object QryFechamentoCodProfSolic: TIntegerField
      FieldName = 'CodProfSolic'
      Origin = 'DNLABVET.MovPedido.CodProfSolic'
    end
    object QryFechamentoCodProfLaudo: TIntegerField
      FieldName = 'CodProfLaudo'
      Origin = 'DNLABVET.MovPedido.CodProfLaudo'
    end
    object QryFechamentoAssinaturaScanner: TStringField
      FieldName = 'AssinaturaScanner'
      Origin = 'DNLABVET.MovPedido.AssinaturaScanner'
      FixedChar = True
      Size = 1
    end
    object QryFechamentoDataPedido: TDateTimeField
      FieldName = 'DataPedido'
      Origin = 'DNLABVET.MovPedido.DataPedido'
    end
    object QryFechamentoHoraPedido: TStringField
      FieldName = 'HoraPedido'
      Origin = 'DNLABVET.MovPedido.HoraPedido'
      FixedChar = True
      Size = 5
    end
    object QryFechamentoDataEnvio: TDateTimeField
      FieldName = 'DataEnvio'
      Origin = 'DNLABVET.MovPedido.DataEnvio'
    end
    object QryFechamentoValorTotal: TFloatField
      FieldName = 'ValorTotal'
      Origin = 'DNLABVET.MovPedido.ValorTotal'
    end
    object QryFechamentoPago: TStringField
      FieldName = 'Pago'
      Origin = 'DNLABVET.MovPedido.Pago'
      FixedChar = True
      Size = 1
    end
    object QryFechamentoFormadeEnvio: TStringField
      FieldName = 'FormadeEnvio'
      Origin = 'DNLABVET.MovPedido.FormadeEnvio'
      FixedChar = True
      Size = 15
    end
    object QryFechamentoRetirar: TStringField
      FieldName = 'Retirar'
      Origin = 'DNLABVET.MovPedido.Retirar'
      FixedChar = True
      Size = 1
    end
    object QryFechamentoRetirado: TStringField
      FieldName = 'Retirado'
      Origin = 'DNLABVET.MovPedido.Retirado'
      FixedChar = True
      Size = 1
    end
    object QryFechamentoContato: TStringField
      FieldName = 'Contato'
      Origin = 'DNLABVET.MovPedido.Contato'
      FixedChar = True
    end
    object QryFechamentoStatus: TStringField
      FieldName = 'Status'
      Origin = 'DNLABVET.MovPedido.Status'
      FixedChar = True
      Size = 1
    end
    object QryFechamentoCodSeqContas: TIntegerField
      FieldName = 'CodSeqContas'
      Origin = 'DNLABVET.MovPedido.CodSeqContas'
    end
    object QryFechamentoNomeAnimal: TStringField
      FieldName = 'NomeAnimal'
      Origin = 'DNLABVET.MovPedido.NomeAnimal'
      FixedChar = True
    end
    object QryFechamentoProprietario: TStringField
      FieldName = 'Proprietario'
      Origin = 'DNLABVET.MovPedido.Proprietario'
      FixedChar = True
      Size = 50
    end
    object QryFechamentoIdade: TStringField
      FieldName = 'Idade'
      Origin = 'DNLABVET.MovPedido.Idade'
      FixedChar = True
      Size = 10
    end
    object QryFechamentoSexoAnimal: TStringField
      FieldName = 'SexoAnimal'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      FixedChar = True
      Size = 1
    end
    object QryFechamentoCodMovExames: TAutoIncField
      FieldName = 'CodMovExames'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
    end
    object QryFechamentoCodMovPedido_1: TIntegerField
      FieldName = 'CodMovPedido_1'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
    end
    object QryFechamentoCodExame: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
    end
    object QryFechamentoDataProvResultado: TDateTimeField
      FieldName = 'DataProvResultado'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
    end
    object QryFechamentoDataResultado: TDateTimeField
      FieldName = 'DataResultado'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
    end
    object QryFechamentoValor: TFloatField
      FieldName = 'Valor'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
    end
    object QryFechamentoObservacao: TMemoField
      FieldName = 'Observacao'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      BlobType = ftMemo
    end
    object QryFechamentoCodEspecie_1: TIntegerField
      FieldName = 'CodEspecie_1'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
    end
    object QryFechamentoNomeExame: TStringField
      FieldName = 'NomeExame'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      FixedChar = True
      Size = 50
    end
    object QryFechamentoNomeExameReduz: TStringField
      FieldName = 'NomeExameReduz'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      FixedChar = True
      Size = 10
    end
    object QryFechamentoDias_Elaboracao_Exame: TIntegerField
      FieldName = 'Dias_Elaboracao_Exame'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
    end
    object QryFechamentoImprimirSeparado: TStringField
      FieldName = 'ImprimirSeparado'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      FixedChar = True
      Size = 1
    end
    object QryFechamentoMetodo: TStringField
      FieldName = 'Metodo'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      FixedChar = True
    end
    object QryFechamentoMaterial: TStringField
      FieldName = 'Material'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      FixedChar = True
      Size = 50
    end
    object QryFechamentoLiberado: TStringField
      FieldName = 'Liberado'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      FixedChar = True
      Size = 1
    end
    object QryFechamentoDataLiberacao: TDateTimeField
      FieldName = 'DataLiberacao'
      Origin = 'DNLABVET.MovPedido.DataLiberacao'
    end
    object QryFechamentoRaca: TStringField
      FieldName = 'Raca'
      Origin = 'DNLABVET.MovPedido.Raca'
      FixedChar = True
      Size = 15
    end
  end
  object DSFechamento: TDataSource
    AutoEdit = False
    DataSet = QryFechamento
    Left = 613
    Top = 90
  end
  object QryContas: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Contas')
    UpdateObject = UpdateSQL1
    Left = 696
    Top = 88
    object QryContasCODSEQCONTAS: TAutoIncField
      FieldName = 'CODSEQCONTAS'
      Origin = 'DNLABVET.Contas.CODSEQCONTAS'
    end
    object QryContasTIPOACAO: TStringField
      FieldName = 'TIPOACAO'
      Origin = 'DNLABVET.Contas.TIPOACAO'
      FixedChar = True
      Size = 1
    end
    object QryContasDESCRICAO: TStringField
      FieldName = 'DESCRICAO'
      Origin = 'DNLABVET.Contas.DESCRICAO'
      FixedChar = True
      Size = 30
    end
    object QryContasQTDEPARC: TIntegerField
      FieldName = 'QTDEPARC'
      Origin = 'DNLABVET.Contas.QTDEPARC'
    end
    object QryContasNUMPARC: TIntegerField
      FieldName = 'NUMPARC'
      Origin = 'DNLABVET.Contas.NUMPARC'
    end
    object QryContasDTEMISSAO: TDateTimeField
      FieldName = 'DTEMISSAO'
      Origin = 'DNLABVET.Contas.DTEMISSAO'
    end
    object QryContasDTVENC: TDateTimeField
      FieldName = 'DTVENC'
      Origin = 'DNLABVET.Contas.DTVENC'
    end
    object QryContasDTPGTO: TDateTimeField
      FieldName = 'DTPGTO'
      Origin = 'DNLABVET.Contas.DTPGTO'
    end
    object QryContasVLFATURA: TFloatField
      FieldName = 'VLFATURA'
      Origin = 'DNLABVET.Contas.VLFATURA'
    end
    object QryContasVLDESCONTO: TFloatField
      FieldName = 'VLDESCONTO'
      Origin = 'DNLABVET.Contas.VLDESCONTO'
    end
    object QryContasVLPGTO: TFloatField
      FieldName = 'VLPGTO'
      Origin = 'DNLABVET.Contas.VLPGTO'
    end
    object QryContasCODCLIENTE: TIntegerField
      FieldName = 'CODCLIENTE'
      Origin = 'DNLABVET.Contas.CODCLIENTE'
    end
    object QryContasCODFORN: TIntegerField
      FieldName = 'CODFORN'
      Origin = 'DNLABVET.Contas.CODFORN'
    end
    object QryContasCONFERIDO: TIntegerField
      FieldName = 'CONFERIDO'
      Origin = 'DNLABVET.Contas.CONFERIDO'
    end
    object QryContasNDOCTIT: TStringField
      FieldName = 'NDOCTIT'
      Origin = 'DNLABVET.Contas.NDOCTIT'
      FixedChar = True
      Size = 50
    end
    object QryContasATIVO: TStringField
      FieldName = 'ATIVO'
      Origin = 'DNLABVET.Contas.ATIVO'
      FixedChar = True
      Size = 1
    end
    object QryContasCODBANCO: TIntegerField
      FieldName = 'CODBANCO'
      Origin = 'DNLABVET.Contas.CODBANCO'
    end
    object QryContasTIPOCADASTRO: TStringField
      FieldName = 'TIPOCADASTRO'
      Origin = 'DNLABVET.Contas.TIPOCADASTRO'
      FixedChar = True
      Size = 1
    end
    object QryContasDESCR: TStringField
      FieldName = 'DESCR'
      Origin = 'DNLABVET.Contas.DESCR'
      FixedChar = True
      Size = 100
    end
    object QryContasVLCAlCULADO: TFloatField
      FieldName = 'VLCAlCULADO'
      Origin = 'DNLABVET.Contas.VLCAlCULADO'
    end
    object QryContasCodRespProf: TIntegerField
      FieldName = 'CodRespProf'
      Origin = 'DNLABVET.Contas.CodRespProf'
    end
    object QryContasCODDESCONTO: TIntegerField
      FieldName = 'CODDESCONTO'
      Origin = 'DNLABVET.Contas.CODDESCONTO'
    end
  end
  object UpdateSQL1: TUpdateSQL
    ModifySQL.Strings = (
      'update Contas'
      'set'
      '  TIPOACAO = :TIPOACAO,'
      '  DESCRICAO = :DESCRICAO,'
      '  QTDEPARC = :QTDEPARC,'
      '  NUMPARC = :NUMPARC,'
      '  DTEMISSAO = :DTEMISSAO,'
      '  DTVENC = :DTVENC,'
      '  DTPGTO = :DTPGTO,'
      '  VLCALCULADO = :VLCALCULADO,'
      '  VLDESCONTO = :VLDESCONTO,'
      '  VLFATURA = :VLFATURA,'
      '  VLPGTO = :VLPGTO,'
      '  CODCLIENTE = :CODCLIENTE,'
      '  CODFORN = :CODFORN,'
      '  CONFERIDO = :CONFERIDO,'
      '  NDOCTIT = :NDOCTIT,'
      '  ATIVO = :ATIVO,'
      '  CODBANCO = :CODBANCO,'
      '  TIPOCADASTRO = :TIPOCADASTRO,'
      '  DESCR = :DESCR,'
      '  CodRespProf = :CodRespProf,'
      '  CODDESCONTO = :CODDESCONTO'
      'where'
      '  CODSEQCONTAS = :OLD_CODSEQCONTAS')
    InsertSQL.Strings = (
      'insert into Contas'
      
        '  (TIPOACAO, DESCRICAO, QTDEPARC, NUMPARC, DTEMISSAO, DTVENC, DT' +
        'PGTO, VLCALCULADO, '
      
        '   VLDESCONTO, VLFATURA, VLPGTO, CODCLIENTE, CODFORN, CONFERIDO,' +
        ' NDOCTIT, '
      
        '   ATIVO, CODBANCO, TIPOCADASTRO, DESCR, CodRespProf, CODDESCONT' +
        'O)'
      'values'
      
        '  (:TIPOACAO, :DESCRICAO, :QTDEPARC, :NUMPARC, :DTEMISSAO, :DTVE' +
        'NC, :DTPGTO, '
      
        '   :VLCALCULADO, :VLDESCONTO, :VLFATURA, :VLPGTO, :CODCLIENTE, :' +
        'CODFORN, '
      
        '   :CONFERIDO, :NDOCTIT, :ATIVO, :CODBANCO, :TIPOCADASTRO, :DESC' +
        'R, :CodRespProf, '
      '   :CODDESCONTO)')
    DeleteSQL.Strings = (
      'delete from Contas'
      'where'
      '  CODSEQCONTAS = :OLD_CODSEQCONTAS')
    Left = 720
    Top = 121
  end
  object DsContas: TDataSource
    AutoEdit = False
    DataSet = QryContas
    Left = 736
    Top = 88
  end
  object SP_FATURA_EXAMES: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_CONFIRMA_FATURAMENTO_VINCULO_CONTAS'
    Left = 800
    Top = 88
    ParamData = <
      item
        DataType = ftInteger
        Name = 'Result'
        ParamType = ptResult
      end
      item
        DataType = ftInteger
        Name = '@CodMovPedido_1'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CodSeqContas_2'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Pago_3'
        ParamType = ptInput
      end>
  end
  object SPContas: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_Insert_Contas'
    Left = 741
    Top = 189
    ParamData = <
      item
        DataType = ftInteger
        Name = 'Result'
        ParamType = ptResult
      end
      item
        DataType = ftInteger
        Name = '@CodSeqContas_1'
        ParamType = ptOutput
      end
      item
        DataType = ftString
        Name = '@TIPOACAO_2'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@DESCRICAO_3'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@QTDEPARC_4'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@NUMPARC_5'
        ParamType = ptInput
      end
      item
        DataType = ftDateTime
        Name = '@DTEMISSAO_6'
        ParamType = ptInput
      end
      item
        DataType = ftDateTime
        Name = '@DTVENC_7'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@VLCALCULADO_8'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@VLDESCONTO_9'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@VLFATURA_10'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CODCLIENTE_11'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CODFORN_12'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@NDOCTIT_13'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@ATIVO_14'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CODBANCO_15'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@TIPOCADASTRO_16'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@DESCR_17'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CodRespProf_18'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CODDESCONTO_19'
        ParamType = ptInput
      end>
  end
  object QryBanco: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Banco')
    Left = 605
    Top = 250
    object QryBancoCODBANCO: TAutoIncField
      FieldName = 'CODBANCO'
      Origin = 'DNLABVET.Banco.CODBANCO'
    end
    object QryBancoNUMBANCO: TStringField
      FieldName = 'NUMBANCO'
      Origin = 'DNLABVET.Banco.NUMBANCO'
      FixedChar = True
      Size = 10
    end
    object QryBancoNOMEBANCO: TStringField
      FieldName = 'NOMEBANCO'
      Origin = 'DNLABVET.Banco.NOMEBANCO'
      FixedChar = True
      Size = 50
    end
    object QryBancoNUMAGENCIA: TStringField
      FieldName = 'NUMAGENCIA'
      Origin = 'DNLABVET.Banco.NUMAGENCIA'
      FixedChar = True
      Size = 10
    end
    object QryBancoNOMEAGENCIA: TStringField
      FieldName = 'NOMEAGENCIA'
      Origin = 'DNLABVET.Banco.NOMEAGENCIA'
      FixedChar = True
      Size = 50
    end
    object QryBancoNUMCONTA: TStringField
      FieldName = 'NUMCONTA'
      Origin = 'DNLABVET.Banco.NUMCONTA'
      FixedChar = True
      Size = 10
    end
    object QryBancoATIVO: TStringField
      FieldName = 'ATIVO'
      Origin = 'DNLABVET.Banco.ATIVO'
      FixedChar = True
      Size = 1
    end
  end
  object DSBanco: TDataSource
    AutoEdit = False
    DataSet = QryBanco
    Left = 645
    Top = 250
  end
  object QryProfResp: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From ProfissionalLaudo'
      'Order by NomeProfLaudo')
    Left = 605
    Top = 290
    object QryProfRespCodProfLaudo: TAutoIncField
      FieldName = 'CodProfLaudo'
      Origin = 'DNLABVET.ProfissionalLaudo.CodProfLaudo'
    end
    object QryProfRespAbrevConselho: TStringField
      FieldName = 'AbrevConselho'
      Origin = 'DNLABVET.ProfissionalLaudo.AbrevConselho'
      FixedChar = True
      Size = 10
    end
    object QryProfRespNumConselho: TStringField
      FieldName = 'NumConselho'
      Origin = 'DNLABVET.ProfissionalLaudo.NumConselho'
      FixedChar = True
      Size = 15
    end
    object QryProfRespNomeProfLaudo: TStringField
      FieldName = 'NomeProfLaudo'
      Origin = 'DNLABVET.ProfissionalLaudo.NomeProfLaudo'
      FixedChar = True
      Size = 50
    end
    object QryProfRespUF: TStringField
      FieldName = 'UF'
      Origin = 'DNLABVET.ProfissionalLaudo.UF'
      FixedChar = True
      Size = 2
    end
    object QryProfRespAssinatura: TBlobField
      FieldName = 'Assinatura'
      Origin = 'DNLABVET.ProfissionalLaudo.Assinatura'
    end
    object QryProfRespAtivo: TStringField
      FieldName = 'Ativo'
      Origin = 'DNLABVET.ProfissionalLaudo.Ativo'
      FixedChar = True
      Size = 1
    end
  end
  object DsProfResp: TDataSource
    AutoEdit = False
    DataSet = QryProfResp
    Left = 645
    Top = 290
  end
  object DsDesconto: TDataSource
    AutoEdit = False
    DataSet = QryDesconto
    Left = 645
    Top = 330
  end
  object QryDesconto: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Desconto'
      'Order by Nome')
    Left = 605
    Top = 330
    object QryDescontoCODDESCONTO: TAutoIncField
      FieldName = 'CODDESCONTO'
      Origin = 'DNLABVET.Desconto.CODDESCONTO'
    end
    object QryDescontoNome: TStringField
      FieldName = 'Nome'
      Origin = 'DNLABVET.Desconto.Nome'
      FixedChar = True
      Size = 40
    end
    object QryDescontoValorInicial: TFloatField
      FieldName = 'ValorInicial'
      Origin = 'DNLABVET.Desconto.ValorInicial'
    end
    object QryDescontoValorFinal: TFloatField
      FieldName = 'ValorFinal'
      Origin = 'DNLABVET.Desconto.ValorFinal'
    end
    object QryDescontoDesconto: TFloatField
      FieldName = 'Desconto'
      Origin = 'DNLABVET.Desconto.Desconto'
    end
    object QryDescontoAtivo: TStringField
      FieldName = 'Ativo'
      Origin = 'DNLABVET.Desconto.Ativo'
      FixedChar = True
      Size = 1
    end
  end
end
