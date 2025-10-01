object FrmContas: TFrmContas
  Left = 60
  Top = 57
  Width = 934
  Height = 658
  Caption = 'Gest'#227'o Financeira <Contas a Pagar / Receber / Pago / Recebido )'
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  OnActivate = FormActivate
  OnClose = FormClose
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object ScrollBox: TScrollBox
    Left = 0
    Top = 0
    Width = 918
    Height = 620
    HorzScrollBar.Margin = 6
    HorzScrollBar.Range = 444
    VertScrollBar.Margin = 6
    VertScrollBar.Range = 160
    Align = alClient
    AutoScroll = False
    BevelOuter = bvRaised
    BevelKind = bkFlat
    BevelWidth = 3
    BorderStyle = bsNone
    TabOrder = 0
    object ScrollBox2: TScrollBox
      Left = 0
      Top = 118
      Width = 906
      Height = 471
      Align = alClient
      TabOrder = 0
      object PageControl1: TPageControl
        Left = 0
        Top = 0
        Width = 902
        Height = 467
        ActivePage = TabSheet1
        Align = alClient
        TabOrder = 0
        object TabSheet1: TTabSheet
          Caption = 'Contas'
          object Panel1: TPanel
            Left = 818
            Top = 0
            Width = 76
            Height = 439
            Align = alRight
            TabOrder = 0
            object SBExcluir: TSpeedButton
              Left = 4
              Top = 120
              Width = 72
              Height = 58
              Hint = 'Apaga o registro selecionado (ALT+A).'
              Caption = '&Excluir'
              Enabled = False
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              Glyph.Data = {
                76010000424D7601000000000000760000002800000020000000100000000100
                04000000000000010000120B0000120B00001000000000000000000000000000
                800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
                FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00333000000000
                3333333777777777F3333330F777777033333337F3F3F3F7F3333330F0808070
                33333337F7F7F7F7F3333330F080707033333337F7F7F7F7F3333330F0808070
                33333337F7F7F7F7F3333330F080707033333337F7F7F7F7F3333330F0808070
                333333F7F7F7F7F7F3F33030F080707030333737F7F7F7F7F7333300F0808070
                03333377F7F7F7F773333330F080707033333337F7F7F7F7F333333070707070
                33333337F7F7F7F7FF3333000000000003333377777777777F33330F88877777
                0333337FFFFFFFFF7F3333000000000003333377777777777333333330777033
                3333333337FFF7F3333333333000003333333333377777333333}
              Layout = blGlyphTop
              NumGlyphs = 2
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = SBExcluirClick
            end
            object SBIncluir: TSpeedButton
              Left = 4
              Top = 4
              Width = 72
              Height = 57
              Hint = 'Abre um novo registro (Insert).'
              Caption = '&Novo'
              Enabled = False
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
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
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = SBIncluirClick
            end
            object SBAlterar: TSpeedButton
              Left = 4
              Top = 61
              Width = 72
              Height = 59
              Hint = 'Abre um novo registro (Insert).'
              Caption = '&Alterar'
              Enabled = False
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              Glyph.Data = {
                76010000424D7601000000000000760000002800000020000000100000000100
                04000000000000010000120B0000120B00001000000000000000000000000000
                800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
                FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00333333000000
                000033333377777777773333330FFFFFFFF03FF3FF7FF33F3FF700300000FF0F
                00F077F777773F737737E00BFBFB0FFFFFF07773333F7F3333F7E0BFBF000FFF
                F0F077F3337773F3F737E0FBFBFBF0F00FF077F3333FF7F77F37E0BFBF00000B
                0FF077F3337777737337E0FBFBFBFBF0FFF077F33FFFFFF73337E0BF0000000F
                FFF077FF777777733FF7000BFB00B0FF00F07773FF77373377373330000B0FFF
                FFF03337777373333FF7333330B0FFFF00003333373733FF777733330B0FF00F
                0FF03333737F37737F373330B00FFFFF0F033337F77F33337F733309030FFFFF
                00333377737FFFFF773333303300000003333337337777777333}
              Layout = blGlyphTop
              NumGlyphs = 2
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = SBAlterarClick
            end
            object SpeedButton2: TSpeedButton
              Left = 4
              Top = 381
              Width = 72
              Height = 59
              Hint = 'Apaga o registro selecionado (ALT+A).'
              Caption = '&Fechar'
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              Glyph.Data = {
                76010000424D7601000000000000760000002800000020000000100000000100
                04000000000000010000120B0000120B00001000000000000000000000000000
                800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
                FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00330000000000
                03333377777777777F333301111111110333337F333333337F33330111111111
                0333337F333333337F333301111111110333337F333333337F33330111111111
                0333337F333333337F333301111111110333337F333333337F33330111111111
                0333337F3333333F7F333301111111B10333337F333333737F33330111111111
                0333337F333333337F333301111111110333337F33FFFFF37F3333011EEEEE11
                0333337F377777F37F3333011EEEEE110333337F37FFF7F37F3333011EEEEE11
                0333337F377777337F333301111111110333337F333333337F33330111111111
                0333337FFFFFFFFF7F3333000000000003333377777777777333}
              Layout = blGlyphTop
              NumGlyphs = 2
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = SpeedButton2Click
            end
            object SBPagaRecebe: TSpeedButton
              Left = 4
              Top = 178
              Width = 72
              Height = 90
              Caption = '&Paga / Recebe'
              Enabled = False
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              Glyph.Data = {
                76020000424D7602000000000000760000002800000020000000200000000100
                0400000000000002000000000000000000001000000000000000000000000000
                8000008000000080800080000000800080008080000080808000C0C0C0000000
                FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00FFFFFFFFFFFF
                FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF77700FFFFFFFFFFFFFFFFFFFFFFFFFF788
                8880FFFFFFFFFFFFFFFFFF77700FFF77777FFFFFFFFFFFFFFFFFF7888880FFFF
                FFFFFFFFFFFFFFFFFFFFFF77777FFFFFFF770000FFFFFFFFFFFFFFFFFFFFFFFF
                F78888880FFFFFFFFFFFFFFFFFFFFF7708777777800000FFFFFFFFFFFFFFF788
                778888887078880FFFFFFFFFFFFFF8770877777780777780FFFFFFFFFFFFF788
                7788888870788870FFFFFFFFFFFFF8770877777780777780FFFFFFFFFFFFF788
                7788888870788870FFFFFFFFFFFFF8770888888880777780FFFF777777777788
                70888888007888707777000000000877777000000777778000000A2022222788
                888702207888887002A0020F0A00A8888888000087777780F0200A0F0AAAA088
                88800F0078888870F0A00220AAAAAA000000F0008888888002200A220AAA0AAA
                A007F7000888880A22A002A2AAA0F0AAAA07770AA00000AA2A2002202AAA0AAA
                AA08F80AAAAAAAA202200A0F02AAAAAAAA00700A02020220F020020F02AAAAAA
                A0000000AAAAAA20F0200A202AA002020A0A0A00A00A0AA202A002A2A2222222
                222222222222222A2A2000000000000000000000000000000000FFFFFFFFFFFF
                FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
                FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF}
              Layout = blGlyphTop
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = SBPagaRecebeClick
            end
            object SBImprimir: TSpeedButton
              Left = 4
              Top = 318
              Width = 72
              Height = 63
              Caption = 'Imprimir'
              Enabled = False
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              Glyph.Data = {
                76020000424D7602000000000000760000002800000020000000200000000100
                0400000000000002000000000000000000001000000000000000000000000000
                8000008000000080800080000000800080008080000080808000C0C0C0000000
                FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00FFFFFFFFFFFF
                FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
                77777FFFFFFFFFFFFFFFFFFFFFFFFF778877777FFFFFFFFFFFFFFFFFFFFF7788
                77777777FFFFFFFFFFFFFFFFFF7788777777777777FFFFFFFFFFFFFF77887777
                788777777777FFFFFFFFFF77887777877887777777777FFFFFFFFF8877788887
                788777777777777FFFFFF8777788888778877777777777777FFF888888888887
                778777777777777777FF8888888888887888877777777777777F8888888888F8
                7778888777777777777F88888888FF888877788877777777777F888888FF8888
                888878888877777777778888FF8888888888888888887777777788FF88889988
                8888FFF8788888777777FF888228988888FFFFF8878888887777FFFF8A8888F8
                FFFFFFF8887888888877FFFFFF88777FFFFFFF88887888888887FFFFFFFF8777
                FFFFF88F88878888887FFFFFFFFFFF887FFF88F8F887887777FFFFFFFFFFFFFF
                88FFFFFFFF887777FFFFFFFFFFFFFFFFFF8FFFFFFF8887FFFFFFFFFFFFFFFFFF
                FFFFFFFFFFF8887FFFFFFFFFFFFFFFFFFFFFFFFF8F888B877FFFFFFFFFFFFFFF
                FFFFFFF8F8FBBBBBFFFFFFFFFFFFFFFFFFFFFFFF8FBBBFFFFFFFFFFFFFFFFFFF
                FFFFFFFFFBBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
                FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF}
              Layout = blGlyphTop
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = SBImprimirClick
            end
            object SBCancelaPgto: TSpeedButton
              Left = 4
              Top = 269
              Width = 72
              Height = 49
              Hint = 'Apaga o registro selecionado (ALT+A).'
              Caption = '&Canc.Efetiv.'
              Enabled = False
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              Glyph.Data = {
                76010000424D7601000000000000760000002800000020000000100000000100
                04000000000000010000130B0000130B00001000000000000000000000000000
                800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
                FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00333333333333
                3333333333FFFFF3333333333999993333333333F77777FFF333333999999999
                33333337777FF377FF3333993370739993333377FF373F377FF3399993000339
                993337777F777F3377F3393999707333993337F77737333337FF993399933333
                399377F3777FF333377F993339903333399377F33737FF33377F993333707333
                399377F333377FF3377F993333101933399377F333777FFF377F993333000993
                399377FF3377737FF7733993330009993933373FF3777377F7F3399933000399
                99333773FF777F777733339993707339933333773FF7FFF77333333999999999
                3333333777333777333333333999993333333333377777333333}
              Layout = blGlyphTop
              NumGlyphs = 2
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = SBCancelaPgtoClick
            end
          end
          object DBGrid1: TDBGrid
            Left = 0
            Top = 0
            Width = 818
            Height = 439
            Align = alClient
            Color = clInfoBk
            DataSource = DSCOntas
            TabOrder = 1
            TitleFont.Charset = DEFAULT_CHARSET
            TitleFont.Color = clWindowText
            TitleFont.Height = -11
            TitleFont.Name = 'MS Sans Serif'
            TitleFont.Style = []
            OnCellClick = DBGrid1CellClick
            OnDrawColumnCell = DBGrid1DrawColumnCell
            Columns = <
              item
                Expanded = False
                FieldName = 'TIPOACAO'
                Title.Caption = 'A'#231#227'o'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'DESCRICAO'
                Title.Caption = 'Descri'#231#227'o'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'NUMPARC'
                Title.Caption = 'Num Parc'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'QTDEPARC'
                Title.Caption = 'Qtde Parc'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'DTEMISSAO'
                Title.Caption = 'Emiss'#227'o'
                Width = 83
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'DTVENC'
                Title.Caption = 'Vencimento'
                Width = 88
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'VLFATURA'
                Title.Caption = 'Valor Fatura'
                Width = 85
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Clinica'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Fornecedor'
                Visible = True
              end>
          end
        end
        object TabSheet2: TTabSheet
          Caption = 'Manuten'#231#227'o Contas a Pagar e Receber'
          ImageIndex = 1
          object Panel2: TPanel
            Left = 0
            Top = 0
            Width = 825
            Height = 439
            Align = alClient
            TabOrder = 0
            object ScrollBox1: TScrollBox
              Left = 1
              Top = 1
              Width = 823
              Height = 437
              Align = alClient
              Font.Charset = ANSI_CHARSET
              Font.Color = clWindowText
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              ParentFont = False
              TabOrder = 0
              object Label2: TLabel
                Left = 16
                Top = 8
                Width = 58
                Height = 16
                Caption = 'Descri'#231#227'o'
                FocusControl = DBEdit1
              end
              object Label3: TLabel
                Left = 418
                Top = 8
                Width = 83
                Height = 16
                Caption = 'Qtde Parcelas'
              end
              object Label6: TLabel
                Left = 16
                Top = 107
                Width = 68
                Height = 16
                Caption = 'Vencimento'
              end
              object Label7: TLabel
                Left = 152
                Top = 106
                Width = 88
                Height = 16
                Caption = 'Valor Estimado'
              end
              object Label13: TLabel
                Left = 16
                Top = 151
                Width = 54
                Height = 16
                Caption = 'NDOCTIT'
                FocusControl = DBEdit12
              end
              object Label4: TLabel
                Left = 514
                Top = 8
                Width = 41
                Height = 16
                Caption = 'Contas'
              end
              object Label5: TLabel
                Left = 154
                Top = 204
                Width = 65
                Height = 16
                Caption = 'Fornecedor'
              end
              object Label8: TLabel
                Left = 365
                Top = 8
                Width = 45
                Height = 16
                Caption = 'N'#186' Parc'
              end
              object DBTP: TDBText
                Left = 368
                Top = 28
                Width = 41
                Height = 17
                DataField = 'NUMPARC'
                DataSource = DSCOntas
              end
              object Label12: TLabel
                Left = 16
                Top = 56
                Width = 66
                Height = 16
                Caption = 'Coment'#225'rio'
                FocusControl = DBEdit2
              end
              object Label14: TLabel
                Left = 17
                Top = 304
                Width = 83
                Height = 16
                Caption = 'Banco / Conta'
              end
              object Label15: TLabel
                Left = 280
                Top = 107
                Width = 97
                Height = 16
                Caption = 'Data Pagamento'
                FocusControl = DBCheckBox1
                Visible = False
              end
              object Label16: TLabel
                Left = 416
                Top = 106
                Width = 63
                Height = 16
                Caption = 'Valor Pago'
                Visible = False
              end
              object DBEdit1: TDBEdit
                Left = 16
                Top = 24
                Width = 345
                Height = 24
                CharCase = ecUpperCase
                DataField = 'DESCRICAO'
                DataSource = DSCOntas
                TabOrder = 0
              end
              object DBEdit12: TDBEdit
                Left = 16
                Top = 167
                Width = 371
                Height = 24
                DataField = 'NDOCTIT'
                DataSource = DSCOntas
                TabOrder = 6
              end
              object RadioGroup3: TRadioGroup
                Left = 16
                Top = 199
                Width = 121
                Height = 98
                Caption = 'Tipo'
                ItemIndex = 0
                Items.Strings = (
                  'Cliente'
                  'Fornecedor')
                TabOrder = 7
                OnClick = RadioGroup3Click
              end
              object DBComboBox1: TDBComboBox
                Left = 512
                Top = 24
                Width = 121
                Height = 24
                DataField = 'TIPOACAO'
                DataSource = DSCOntas
                ItemHeight = 16
                Items.Strings = (
                  'Pagar'
                  'Receber')
                TabOrder = 2
              end
              object DBDateEdit1: TDBDateEdit
                Left = 16
                Top = 123
                Width = 121
                Height = 21
                DataField = 'DTVENC'
                DataSource = DSCOntas
                NumGlyphs = 2
                TabOrder = 4
              end
              object RxDBCalcEdit1: TRxDBCalcEdit
                Left = 152
                Top = 122
                Width = 102
                Height = 21
                DataField = 'VLFATURA'
                DataSource = DSCOntas
                DisplayFormat = ',0.00'
                NumGlyphs = 2
                TabOrder = 5
              end
              object RxDBLookupCombo2: TRxDBLookupCombo
                Left = 152
                Top = 224
                Width = 369
                Height = 23
                DropDownCount = 8
                DataField = 'CODCLIENTE'
                DataSource = DSCOntas
                LookupField = 'CodCliente'
                LookupDisplay = 'Nome'
                LookupSource = DSCliente
                TabOrder = 8
              end
              object RxDBCalcEdit2: TRxDBCalcEdit
                Left = 417
                Top = 24
                Width = 89
                Height = 25
                DataField = 'QTDEPARC'
                DataSource = DSCOntas
                DecimalPlaces = 0
                DisplayFormat = ',0'
                NumGlyphs = 2
                TabOrder = 1
              end
              object DBCheckBox1: TDBCheckBox
                Left = 536
                Top = 224
                Width = 97
                Height = 17
                Caption = 'Ativo'
                DataField = 'ATIVO'
                DataSource = DSCOntas
                TabOrder = 9
                ValueChecked = 'S'
                ValueUnchecked = 'N'
              end
              object DBEdit2: TDBEdit
                Left = 16
                Top = 72
                Width = 617
                Height = 24
                CharCase = ecUpperCase
                DataField = 'DESCR'
                DataSource = DSCOntas
                TabOrder = 3
              end
              object RxDBLookupCombo4: TRxDBLookupCombo
                Left = 156
                Top = 224
                Width = 369
                Height = 23
                DropDownCount = 8
                DataField = 'CODFORN'
                DataSource = DSCOntas
                LookupField = 'CODFORN'
                LookupDisplay = 'NOMEFORN'
                LookupSource = DSForn
                TabOrder = 10
              end
              object RxDBLookupCombo5: TRxDBLookupCombo
                Left = 16
                Top = 324
                Width = 756
                Height = 23
                DropDownCount = 8
                DataField = 'CODBANCO'
                DataSource = DSCOntas
                LookupField = 'CODBANCO'
                LookupDisplay = 'NOMEBANCO;NUMAGENCIA;NUMCONTA'
                LookupSource = DSBanco
                TabOrder = 11
              end
              object DBDateEdit2: TDBDateEdit
                Left = 280
                Top = 123
                Width = 121
                Height = 21
                DataField = 'DTPGTO'
                DataSource = DSCOntas
                NumGlyphs = 2
                TabOrder = 12
                Visible = False
              end
              object RxDBCalcEdit3: TRxDBCalcEdit
                Left = 416
                Top = 122
                Width = 113
                Height = 21
                DataField = 'VLPGTO'
                DataSource = DSCOntas
                DisplayFormat = ',0.00'
                NumGlyphs = 2
                TabOrder = 13
                Visible = False
              end
            end
          end
          object Panel3: TPanel
            Left = 825
            Top = 0
            Width = 69
            Height = 439
            Align = alRight
            TabOrder = 1
            object btngravar: TSpeedButton
              Left = 3
              Top = 10
              Width = 63
              Height = 53
              Hint = 'Grava as altera'#231#245'es (ALT+G).'
              Caption = '&Gravar'
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              Glyph.Data = {
                76010000424D7601000000000000760000002800000020000000100000000100
                04000000000000010000120B0000120B00001000000000000000000000000000
                800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
                FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00333333333333
                333333FFFFFFFFFFFFF33000077777770033377777777777773F000007888888
                00037F3337F3FF37F37F00000780088800037F3337F77F37F37F000007800888
                00037F3337F77FF7F37F00000788888800037F3337777777337F000000000000
                00037F3FFFFFFFFFFF7F00000000000000037F77777777777F7F000FFFFFFFFF
                00037F7F333333337F7F000FFFFFFFFF00037F7F333333337F7F000FFFFFFFFF
                00037F7F333333337F7F000FFFFFFFFF00037F7F333333337F7F000FFFFFFFFF
                00037F7F333333337F7F000FFFFFFFFF07037F7F33333333777F000FFFFFFFFF
                0003737FFFFFFFFF7F7330099999999900333777777777777733}
              Layout = blGlyphTop
              NumGlyphs = 2
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = btngravarClick
            end
            object btncancelar: TSpeedButton
              Left = 4
              Top = 68
              Width = 63
              Height = 56
              Hint = 'Cancela as altera'#231#245'es n'#227'o gravadas(ALT+C).'
              Caption = '&Cancelar'
              Font.Charset = ANSI_CHARSET
              Font.Color = clBlack
              Font.Height = -13
              Font.Name = 'Arial'
              Font.Style = []
              Glyph.Data = {
                76010000424D7601000000000000760000002800000020000000100000000100
                04000000000000010000130B0000130B00001000000000000000000000000000
                800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
                FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00333333333333
                3333333333FFFFF3333333333999993333333333F77777FFF333333999999999
                33333337777FF377FF3333993370739993333377FF373F377FF3399993000339
                993337777F777F3377F3393999707333993337F77737333337FF993399933333
                399377F3777FF333377F993339903333399377F33737FF33377F993333707333
                399377F333377FF3377F993333101933399377F333777FFF377F993333000993
                399377FF3377737FF7733993330009993933373FF3777377F7F3399933000399
                99333773FF777F777733339993707339933333773FF7FFF77333333999999999
                3333333777333777333333333999993333333333377777333333}
              Layout = blGlyphTop
              NumGlyphs = 2
              ParentFont = False
              ParentShowHint = False
              ShowHint = False
              OnClick = btncancelarClick
            end
          end
        end
      end
    end
    object StatusBar1: TStatusBar
      Left = 0
      Top = 589
      Width = 906
      Height = 19
      Panels = <
        item
          Width = 50
        end>
    end
    object Panel11: TPanel
      Left = 0
      Top = 0
      Width = 906
      Height = 118
      Align = alTop
      BevelInner = bvLowered
      Font.Charset = ANSI_CHARSET
      Font.Color = clWindowText
      Font.Height = -13
      Font.Name = 'Arial'
      Font.Style = []
      ParentFont = False
      TabOrder = 2
      object Label1: TLabel
        Left = 394
        Top = 11
        Width = 32
        Height = 16
        Caption = '........'
      end
      object BbtnPesquisar: TBitBtn
        Left = 757
        Top = 72
        Width = 102
        Height = 33
        Caption = '&Pesquisar'
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
      object RadioGroup1: TRadioGroup
        Left = 136
        Top = 7
        Width = 121
        Height = 101
        Caption = 'Tipo de Contas'
        ItemIndex = 0
        Items.Strings = (
          'Ambas'
          'Pagar'
          'Receber')
        TabOrder = 1
      end
      object RadioGroup2: TRadioGroup
        Left = 264
        Top = 7
        Width = 121
        Height = 101
        Caption = 'Tipo'
        ItemIndex = 0
        Items.Strings = (
          'Todos'
          'Cliente'
          'Fornecedor')
        TabOrder = 2
        OnClick = RadioGroup2Click
      end
      object RxDBLookupCombo1: TRxDBLookupCombo
        Left = 392
        Top = 31
        Width = 337
        Height = 23
        DropDownCount = 8
        LookupField = 'CodCliente'
        LookupDisplay = 'Nome'
        LookupSource = DSCliente
        TabOrder = 3
      end
      object GroupBox3: TGroupBox
        Left = 757
        Top = 5
        Width = 101
        Height = 61
        Caption = 'Status'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clBlue
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = []
        ParentFont = False
        TabOrder = 4
        object Label9: TLabel
          Left = 2
          Top = 15
          Width = 97
          Height = 13
          Align = alTop
          Alignment = taCenter
          AutoSize = False
          Caption = 'Pagar'
          Color = 16769695
          FocusControl = BbtnPesquisar
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentColor = False
          ParentFont = False
        end
        object Label10: TLabel
          Left = 2
          Top = 41
          Width = 97
          Height = 13
          Align = alTop
          Alignment = taCenter
          AutoSize = False
          Caption = 'Atrasada'
          Color = clRed
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentColor = False
          ParentFont = False
        end
        object Label11: TLabel
          Left = 2
          Top = 28
          Width = 97
          Height = 13
          Align = alTop
          Alignment = taCenter
          AutoSize = False
          Caption = 'Receber'
          Color = clInfoBk
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentColor = False
          ParentFont = False
        end
      end
      object GroupBox1: TGroupBox
        Left = 392
        Top = 55
        Width = 345
        Height = 53
        Caption = 'Per'#237'odo'
        TabOrder = 5
        object Label21: TLabel
          Left = 166
          Top = 34
          Width = 20
          Height = 16
          Caption = 'At'#233
        end
        object Dtf: TDateEdit
          Left = 211
          Top = 28
          Width = 121
          Height = 21
          NumGlyphs = 2
          TabOrder = 0
        end
        object Dti: TDateEdit
          Left = 16
          Top = 29
          Width = 121
          Height = 21
          NumGlyphs = 2
          TabOrder = 1
        end
      end
      object RxDBLookupCombo3: TRxDBLookupCombo
        Left = 400
        Top = 31
        Width = 337
        Height = 23
        DropDownCount = 8
        LookupField = 'CODFORN'
        LookupDisplay = 'NOMEFORN'
        LookupSource = DSForn
        TabOrder = 6
      end
      object RadioGroup4: TRadioGroup
        Left = 8
        Top = 7
        Width = 121
        Height = 101
        Caption = 'A'#231#227'o'
        ItemIndex = 0
        Items.Strings = (
          'Agendada'
          'Efetivada')
        TabOrder = 7
        OnClick = RadioGroup4Click
      end
    end
  end
  object QryContas: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      
        'Select c.*, cl.nome as Clinica, f.nomeforn as Fornecedor, f.dia_' +
        'venc'
      'From Contas c '
      '         left join cliente cl on c.codcliente = cl.codcliente'
      '         left join fornecedor f on c.codforn = f.codforn'
      '    '
      'Where (c.tipoacao = :Tipoacao or :tipoacao = '#39'-1'#39')'
      ' and'
      '('
      '           (c.CodCliente = :codcliente or :codcliente = -1)'
      'or'
      '            (c.codforn = :codforn or :codforn = -1)'
      ')'
      'and'
      '           (c.dtvenc between :dti and :dtf )'
      'and'
      '           ((c.vlpgto is null) and (c.dtpgto is null) )'
      'order by dtvenc')
    UpdateObject = UpdateSQL1
    Left = 564
    Top = 206
    ParamData = <
      item
        DataType = ftString
        Name = 'Tipoacao'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'tipoacao'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codcliente'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codcliente'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codforn'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codforn'
        ParamType = ptInput
      end
      item
        DataType = ftDate
        Name = 'dti'
        ParamType = ptInput
      end
      item
        DataType = ftDate
        Name = 'dtf'
        ParamType = ptInput
      end>
    object QryContasCODSEQCONTAS: TAutoIncField
      FieldName = 'CODSEQCONTAS'
    end
    object QryContasTIPOACAO: TStringField
      FieldName = 'TIPOACAO'
      FixedChar = True
      Size = 1
    end
    object QryContasDESCRICAO: TStringField
      FieldName = 'DESCRICAO'
      FixedChar = True
      Size = 30
    end
    object QryContasQTDEPARC: TIntegerField
      FieldName = 'QTDEPARC'
    end
    object QryContasNUMPARC: TIntegerField
      FieldName = 'NUMPARC'
    end
    object QryContasDTEMISSAO: TDateTimeField
      FieldName = 'DTEMISSAO'
    end
    object QryContasDTVENC: TDateTimeField
      FieldName = 'DTVENC'
    end
    object QryContasDTPGTO: TDateTimeField
      FieldName = 'DTPGTO'
    end
    object QryContasVLCALCULADO: TFloatField
      FieldName = 'VLCALCULADO'
      currency = True
    end
    object QryContasVLDESCONTO: TFloatField
      FieldName = 'VLDESCONTO'
      currency = True
    end
    object QryContasVLFATURA: TFloatField
      FieldName = 'VLFATURA'
      currency = True
    end
    object QryContasVLPGTO: TFloatField
      FieldName = 'VLPGTO'
      currency = True
    end
    object QryContasCODCLIENTE: TIntegerField
      FieldName = 'CODCLIENTE'
    end
    object QryContasCODFORN: TIntegerField
      FieldName = 'CODFORN'
    end
    object QryContasCONFERIDO: TIntegerField
      FieldName = 'CONFERIDO'
    end
    object QryContasNDOCTIT: TStringField
      FieldName = 'NDOCTIT'
      FixedChar = True
      Size = 50
    end
    object QryContasATIVO: TStringField
      FieldName = 'ATIVO'
      FixedChar = True
      Size = 1
    end
    object QryContasCODBANCO: TIntegerField
      FieldName = 'CODBANCO'
    end
    object QryContasTIPOCADASTRO: TStringField
      FieldName = 'TIPOCADASTRO'
      FixedChar = True
      Size = 1
    end
    object QryContasDESCR: TStringField
      FieldName = 'DESCR'
      FixedChar = True
      Size = 100
    end
    object QryContasCodRespProf: TIntegerField
      FieldName = 'CodRespProf'
    end
    object QryContasCODDESCONTO: TIntegerField
      FieldName = 'CODDESCONTO'
    end
    object QryContasClinica: TStringField
      FieldName = 'Clinica'
      FixedChar = True
      Size = 50
    end
    object QryContasFornecedor: TStringField
      FieldName = 'Fornecedor'
      FixedChar = True
      Size = 50
    end
    object QryContasdia_venc: TIntegerField
      FieldName = 'dia_venc'
    end
  end
  object DSCOntas: TDataSource
    AutoEdit = False
    DataSet = QryContas
    Left = 604
    Top = 206
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
      '  DESCR = :DESCR'
      'where'
      '  CODSEQCONTAS = :OLD_CODSEQCONTAS')
    InsertSQL.Strings = (
      'insert into Contas'
      
        '  (TIPOACAO, DESCRICAO, QTDEPARC, NUMPARC, DTEMISSAO, DTVENC, DT' +
        'PGTO, VLCALCULADO, '
      
        '   VLDESCONTO, VLFATURA, VLPGTO, CODCLIENTE, CODFORN, CONFERIDO,' +
        ' NDOCTIT, '
      '   ATIVO, CODBANCO, TIPOCADASTRO, DESCR)'
      'values'
      
        '  (:TIPOACAO, :DESCRICAO, :QTDEPARC, :NUMPARC, :DTEMISSAO, :DTVE' +
        'NC, :DTPGTO, '
      
        '   :VLCALCULADO, :VLDESCONTO, :VLFATURA, :VLPGTO, :CODCLIENTE, :' +
        'CODFORN, '
      
        '   :CONFERIDO, :NDOCTIT, :ATIVO, :CODBANCO, :TIPOCADASTRO, :DESC' +
        'R)')
    DeleteSQL.Strings = (
      'delete from Contas'
      'where'
      '  CODSEQCONTAS = :OLD_CODSEQCONTAS')
    Left = 580
    Top = 238
  end
  object QryCliente: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Cliente'
      'Order by Nome')
    Left = 572
    Top = 286
    object QryClienteCodCliente: TAutoIncField
      FieldName = 'CodCliente'
      Origin = 'DNLABVET.Cliente.CodCliente'
    end
    object QryClienteNome: TStringField
      FieldName = 'Nome'
      Origin = 'DNLABVET.Cliente.Nome'
      FixedChar = True
      Size = 50
    end
    object QryClienteEndereco: TStringField
      FieldName = 'Endereco'
      Origin = 'DNLABVET.Cliente.Endereco'
      FixedChar = True
      Size = 40
    end
    object QryClientenumero: TStringField
      FieldName = 'numero'
      Origin = 'DNLABVET.Cliente.numero'
      FixedChar = True
      Size = 50
    end
    object QryClienteCompl: TStringField
      FieldName = 'Compl'
      Origin = 'DNLABVET.Cliente.Compl'
      FixedChar = True
    end
    object QryClienteBairro: TStringField
      FieldName = 'Bairro'
      Origin = 'DNLABVET.Cliente.Bairro'
      FixedChar = True
      Size = 30
    end
    object QryClienteCEP: TStringField
      FieldName = 'CEP'
      Origin = 'DNLABVET.Cliente.CEP'
      FixedChar = True
      Size = 9
    end
    object QryClienteCidade: TStringField
      FieldName = 'Cidade'
      Origin = 'DNLABVET.Cliente.Cidade'
      FixedChar = True
      Size = 30
    end
    object QryClienteUF: TStringField
      FieldName = 'UF'
      Origin = 'DNLABVET.Cliente.UF'
      FixedChar = True
      Size = 2
    end
    object QryClienteTelefone: TStringField
      FieldName = 'Telefone'
      Origin = 'DNLABVET.Cliente.Telefone'
      FixedChar = True
      Size = 13
    end
    object QryClienteFax: TStringField
      FieldName = 'Fax'
      Origin = 'DNLABVET.Cliente.Fax'
      FixedChar = True
      Size = 13
    end
    object QryClienteCelular: TStringField
      FieldName = 'Celular'
      Origin = 'DNLABVET.Cliente.Celular'
      FixedChar = True
      Size = 13
    end
    object QryClienteemail: TStringField
      FieldName = 'email'
      Origin = 'DNLABVET.Cliente.email'
      FixedChar = True
      Size = 200
    end
    object QryClientecpf_cgc: TStringField
      FieldName = 'cpf_cgc'
      Origin = 'DNLABVET.Cliente.cpf_cgc'
      FixedChar = True
      Size = 18
    end
    object QryClienteContato: TStringField
      FieldName = 'Contato'
      Origin = 'DNLABVET.Cliente.Contato'
      FixedChar = True
      Size = 15
    end
    object QryClienteDataCadastro: TDateTimeField
      FieldName = 'DataCadastro'
      Origin = 'DNLABVET.Cliente.DataCadastro'
    end
    object QryClienteRestricao: TStringField
      FieldName = 'Restricao'
      Origin = 'DNLABVET.Cliente.Restricao'
      FixedChar = True
      Size = 1
    end
    object QryClienteDataAtualizacao: TDateTimeField
      FieldName = 'DataAtualizacao'
      Origin = 'DNLABVET.Cliente.DataAtualizacao'
    end
    object QryClienteAtivo: TStringField
      FieldName = 'Ativo'
      Origin = 'DNLABVET.Cliente.Ativo'
      FixedChar = True
      Size = 1
    end
    object QryClienteCodVetResp: TIntegerField
      FieldName = 'CodVetResp'
      Origin = 'DNLABVET.Cliente.CodVetResp'
    end
  end
  object DSCliente: TDataSource
    AutoEdit = False
    DataSet = QryCliente
    Left = 612
    Top = 286
  end
  object QryForn: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Fornecedor'
      'Order by NomeForn')
    Left = 572
    Top = 334
    object QryFornCODFORN: TAutoIncField
      FieldName = 'CODFORN'
      Origin = 'DNLABVET.Fornecedor.CODFORN'
    end
    object QryFornNOMEFORN: TStringField
      FieldName = 'NOMEFORN'
      Origin = 'DNLABVET.Fornecedor.NOMEFORN'
      FixedChar = True
      Size = 50
    end
    object QryFornAPELIDO: TStringField
      FieldName = 'APELIDO'
      Origin = 'DNLABVET.Fornecedor.APELIDO'
      FixedChar = True
      Size = 15
    end
    object QryFornCGC: TStringField
      FieldName = 'CGC'
      Origin = 'DNLABVET.Fornecedor.CGC'
      FixedChar = True
    end
    object QryFornDTCADASTRO: TDateTimeField
      FieldName = 'DTCADASTRO'
      Origin = 'DNLABVET.Fornecedor.DTCADASTRO'
    end
    object QryFornCODIGO: TIntegerField
      FieldName = 'CODIGO'
      Origin = 'DNLABVET.Fornecedor.CODIGO'
    end
    object QryFornINSCRICAO: TStringField
      FieldName = 'INSCRICAO'
      Origin = 'DNLABVET.Fornecedor.INSCRICAO'
      FixedChar = True
    end
    object QryFornENDERECO: TStringField
      FieldName = 'ENDERECO'
      Origin = 'DNLABVET.Fornecedor.ENDERECO'
      FixedChar = True
      Size = 60
    end
    object QryFornBAIRRO: TStringField
      FieldName = 'BAIRRO'
      Origin = 'DNLABVET.Fornecedor.BAIRRO'
      FixedChar = True
      Size = 30
    end
    object QryFornCIDADE: TStringField
      FieldName = 'CIDADE'
      Origin = 'DNLABVET.Fornecedor.CIDADE'
      FixedChar = True
      Size = 50
    end
    object QryFornCEP: TStringField
      FieldName = 'CEP'
      Origin = 'DNLABVET.Fornecedor.CEP'
      FixedChar = True
      Size = 15
    end
    object QryFornUF: TStringField
      FieldName = 'UF'
      Origin = 'DNLABVET.Fornecedor.UF'
      FixedChar = True
      Size = 2
    end
    object QryFornFONE: TStringField
      FieldName = 'FONE'
      Origin = 'DNLABVET.Fornecedor.FONE'
      FixedChar = True
      Size = 15
    end
    object QryFornFONE1: TStringField
      FieldName = 'FONE1'
      Origin = 'DNLABVET.Fornecedor.FONE1'
      FixedChar = True
      Size = 15
    end
    object QryFornFONE_FAX: TStringField
      FieldName = 'FONE_FAX'
      Origin = 'DNLABVET.Fornecedor.FONE_FAX'
      FixedChar = True
      Size = 15
    end
    object QryFornEMAIL: TStringField
      FieldName = 'EMAIL'
      Origin = 'DNLABVET.Fornecedor.EMAIL'
      FixedChar = True
      Size = 100
    end
    object QryFornCONTATO: TStringField
      FieldName = 'CONTATO'
      Origin = 'DNLABVET.Fornecedor.CONTATO'
      FixedChar = True
    end
    object QryFornAtivo: TStringField
      FieldName = 'Ativo'
      Origin = 'DNLABVET.Fornecedor.Ativo'
      FixedChar = True
      Size = 1
    end
  end
  object DSForn: TDataSource
    AutoEdit = False
    DataSet = QryForn
    Left = 612
    Top = 334
  end
  object SPContas: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_Insert_Contas'
    Left = 597
    Top = 375
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
      'From Banco'
      'Where Ativo = '#39'S'#39
      'Order by NomeBanco')
    Left = 580
    Top = 430
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
    Left = 620
    Top = 430
  end
  object QryEstorno: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From MovPedido'
      'Where CodSeqContas = :CodSeqContas')
    Left = 708
    Top = 206
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodSeqContas'
        ParamType = ptInput
      end>
    object QryEstornoCodMovPedido: TAutoIncField
      FieldName = 'CodMovPedido'
      Origin = 'DNLABVET.MovPedido.CodMovPedido'
    end
    object QryEstornoCodigoInterno: TStringField
      FieldName = 'CodigoInterno'
      Origin = 'DNLABVET.MovPedido.CodigoInterno'
      FixedChar = True
    end
    object QryEstornoCodigoPedido: TIntegerField
      FieldName = 'CodigoPedido'
      Origin = 'DNLABVET.MovPedido.CodigoPedido'
    end
    object QryEstornoSenha: TStringField
      FieldName = 'Senha'
      Origin = 'DNLABVET.MovPedido.Senha'
      FixedChar = True
    end
    object QryEstornoCodCliente: TIntegerField
      FieldName = 'CodCliente'
      Origin = 'DNLABVET.MovPedido.CodCliente'
    end
    object QryEstornoCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.MovPedido.CodEspecie'
    end
    object QryEstornoCodProfSolic: TIntegerField
      FieldName = 'CodProfSolic'
      Origin = 'DNLABVET.MovPedido.CodProfSolic'
    end
    object QryEstornoCodProfLaudo: TIntegerField
      FieldName = 'CodProfLaudo'
      Origin = 'DNLABVET.MovPedido.CodProfLaudo'
    end
    object QryEstornoAssinaturaScanner: TStringField
      FieldName = 'AssinaturaScanner'
      Origin = 'DNLABVET.MovPedido.AssinaturaScanner'
      FixedChar = True
      Size = 1
    end
    object QryEstornoDataPedido: TDateTimeField
      FieldName = 'DataPedido'
      Origin = 'DNLABVET.MovPedido.DataPedido'
    end
    object QryEstornoHoraPedido: TStringField
      FieldName = 'HoraPedido'
      Origin = 'DNLABVET.MovPedido.HoraPedido'
      FixedChar = True
      Size = 5
    end
    object QryEstornoDataEnvio: TDateTimeField
      FieldName = 'DataEnvio'
      Origin = 'DNLABVET.MovPedido.DataEnvio'
    end
    object QryEstornoValorTotal: TFloatField
      FieldName = 'ValorTotal'
      Origin = 'DNLABVET.MovPedido.ValorTotal'
    end
    object QryEstornoPago: TStringField
      FieldName = 'Pago'
      Origin = 'DNLABVET.MovPedido.Pago'
      FixedChar = True
      Size = 1
    end
    object QryEstornoFormadeEnvio: TStringField
      FieldName = 'FormadeEnvio'
      Origin = 'DNLABVET.MovPedido.FormadeEnvio'
      FixedChar = True
      Size = 15
    end
    object QryEstornoRetirar: TStringField
      FieldName = 'Retirar'
      Origin = 'DNLABVET.MovPedido.Retirar'
      FixedChar = True
      Size = 1
    end
    object QryEstornoRetirado: TStringField
      FieldName = 'Retirado'
      Origin = 'DNLABVET.MovPedido.Retirado'
      FixedChar = True
      Size = 1
    end
    object QryEstornoContato: TStringField
      FieldName = 'Contato'
      Origin = 'DNLABVET.MovPedido.Contato'
      FixedChar = True
    end
    object QryEstornoStatus: TStringField
      FieldName = 'Status'
      Origin = 'DNLABVET.MovPedido.Status'
      FixedChar = True
      Size = 1
    end
    object QryEstornoCodSeqContas: TIntegerField
      FieldName = 'CodSeqContas'
      Origin = 'DNLABVET.MovPedido.CodSeqContas'
    end
    object QryEstornoNomeAnimal: TStringField
      FieldName = 'NomeAnimal'
      Origin = 'DNLABVET.MovPedido.NomeAnimal'
      FixedChar = True
    end
    object QryEstornoProprietario: TStringField
      FieldName = 'Proprietario'
      Origin = 'DNLABVET.MovPedido.Proprietario'
      FixedChar = True
      Size = 50
    end
    object QryEstornoIdade: TStringField
      FieldName = 'Idade'
      Origin = 'DNLABVET.MovPedido.Idade'
      FixedChar = True
      Size = 10
    end
    object QryEstornoSexoAnimal: TStringField
      FieldName = 'SexoAnimal'
      Origin = 'DNLABVET.MovPedido.SexoAnimal'
      FixedChar = True
      Size = 1
    end
    object QryEstornoDataLiberacao: TDateTimeField
      FieldName = 'DataLiberacao'
      Origin = 'DNLABVET.MovPedido.DataLiberacao'
    end
    object QryEstornoRaca: TStringField
      FieldName = 'Raca'
      Origin = 'DNLABVET.MovPedido.Raca'
      FixedChar = True
      Size = 15
    end
  end
  object SPEstorno: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_CONFIRMA_FATURAMENTO_VINCULO_CONTAS'
    Left = 708
    Top = 238
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
end
