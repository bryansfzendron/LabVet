object FrmPedido: TFrmPedido
  Left = 22
  Top = 58
  Width = 988
  Height = 632
  Caption = 'Cadastro de Pedidos'
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
  object Label27: TLabel
    Left = 14
    Top = 58
    Width = 77
    Height = 16
    Caption = 'Nome Animal'
  end
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 972
    Height = 193
    Align = alTop
    TabOrder = 0
    object Label9: TLabel
      Left = 13
      Top = 22
      Width = 104
      Height = 16
      Caption = 'Cl'#237'nica Veterin'#225'ria'
    end
    object Label1: TLabel
      Left = 610
      Top = 64
      Width = 40
      Height = 16
      Caption = 'Pedido'
    end
    object Label20: TLabel
      Left = 606
      Top = 22
      Width = 55
      Height = 16
      Caption = 'Protocolo'
    end
    object Label21: TLabel
      Left = 14
      Top = 81
      Width = 77
      Height = 16
      Caption = 'Nome Animal'
    end
    object Label25: TLabel
      Left = 318
      Top = 84
      Width = 66
      Height = 16
      Caption = 'Proprietario'
    end
    object Label26: TLabel
      Left = 14
      Top = 112
      Width = 133
      Height = 16
      Caption = 'Sexo (M)acho (F)'#234'mea'
    end
    object Label28: TLabel
      Left = 15
      Top = 168
      Width = 201
      Height = 16
      Caption = 'N'#250'mero de Controle do Laborat'#243'rio'
      FocusControl = DBEdit6
    end
    object Label29: TLabel
      Left = 13
      Top = 54
      Width = 47
      Height = 16
      Caption = 'Esp'#233'cie'
    end
    object Label30: TLabel
      Left = 14
      Top = 144
      Width = 31
      Height = 16
      Caption = 'Idade'
    end
    object BbtnPesquisar: TBitBtn
      Left = 848
      Top = 48
      Width = 129
      Height = 33
      Cursor = crHandPoint
      Caption = '&Pesquisar'
      TabOrder = 11
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
      LookupDisplay = 'Nome'
      LookupSource = DSCliente
      TabOrder = 0
      OnExit = RxDBLookupCombo2Exit
    end
    object GroupBox2: TGroupBox
      Left = 329
      Top = 115
      Width = 231
      Height = 68
      Caption = 'Periodo'
      TabOrder = 6
      object Label22: TLabel
        Left = 16
        Top = 18
        Width = 33
        Height = 16
        Caption = 'Inicial'
      end
      object Label23: TLabel
        Left = 120
        Top = 18
        Width = 28
        Height = 16
        Caption = 'Final'
      end
      object Dti: TDateEdit
        Left = 8
        Top = 40
        Width = 97
        Height = 21
        NumGlyphs = 2
        TabOrder = 0
      end
      object Dtf: TDateEdit
        Left = 120
        Top = 40
        Width = 97
        Height = 21
        NumGlyphs = 2
        TabOrder = 1
      end
    end
    object EdPedido: TRxCalcEdit
      Left = 672
      Top = 62
      Width = 153
      Height = 21
      AutoSize = False
      NumGlyphs = 2
      TabOrder = 8
    end
    object EdProtocolo: TEdit
      Left = 672
      Top = 21
      Width = 153
      Height = 24
      TabOrder = 7
    end
    object BbtnLimpa: TBitBtn
      Left = 848
      Top = 8
      Width = 129
      Height = 33
      Cursor = crHandPoint
      Caption = '&Limpa Campos'
      TabOrder = 10
      OnClick = BbtnLimpaClick
      Glyph.Data = {
        76010000424D7601000000000000760000002800000020000000100000000100
        04000000000000010000120B0000120B00001000000000000000000000000000
        800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00500005000555
        555557777F777555F55500000000555055557777777755F75555005500055055
        555577F5777F57555555005550055555555577FF577F5FF55555500550050055
        5555577FF77577FF555555005050110555555577F757777FF555555505099910
        555555FF75777777FF555005550999910555577F5F77777775F5500505509990
        3055577F75F77777575F55005055090B030555775755777575755555555550B0
        B03055555F555757575755550555550B0B335555755555757555555555555550
        BBB35555F55555575F555550555555550BBB55575555555575F5555555555555
        50BB555555555555575F555555555555550B5555555555555575}
      NumGlyphs = 2
    end
    object Edit1: TEdit
      Left = 120
      Top = 76
      Width = 193
      Height = 24
      CharCase = ecUpperCase
      TabOrder = 2
    end
    object Edit3: TEdit
      Left = 392
      Top = 77
      Width = 193
      Height = 24
      CharCase = ecUpperCase
      TabOrder = 3
    end
    object RxDBLookupCombo1: TRxDBLookupCombo
      Left = 121
      Top = 49
      Width = 448
      Height = 23
      DropDownCount = 8
      LookupField = 'CodEspecie'
      LookupDisplay = 'NomeEspecie'
      LookupSource = DsEspecie
      TabOrder = 1
      OnExit = RxDBLookupCombo2Exit
    end
    object RadioGroup1: TRadioGroup
      Left = 614
      Top = 102
      Width = 211
      Height = 67
      BiDiMode = bdLeftToRight
      Caption = 'Status do Pedido'
      ItemIndex = 0
      Items.Strings = (
        'Pendente'
        'Conclu'#237'do')
      ParentBiDiMode = False
      TabOrder = 9
    end
    object Edit5: TEdit
      Left = 120
      Top = 139
      Width = 73
      Height = 24
      TabOrder = 4
    end
    object EdCodPedido: TRxCalcEdit
      Left = 221
      Top = 166
      Width = 99
      Height = 21
      AutoSize = False
      NumGlyphs = 2
      TabOrder = 5
    end
    object Edit4: TEdit
      Left = 152
      Top = 107
      Width = 73
      Height = 24
      CharCase = ecUpperCase
      TabOrder = 12
      OnChange = Edit4Change
    end
  end
  object Panel3: TPanel
    Left = 0
    Top = 193
    Width = 972
    Height = 400
    Align = alClient
    Caption = 'Panel3'
    TabOrder = 1
    object PageControl1: TPageControl
      Left = 1
      Top = 1
      Width = 970
      Height = 398
      ActivePage = TSPesquisa
      Align = alClient
      TabOrder = 0
      object TSPesquisa: TTabSheet
        Caption = 'Pesquisa'
        object Panel2: TPanel
          Left = 857
          Top = 0
          Width = 105
          Height = 367
          Align = alRight
          TabOrder = 0
          object BBtnIncluir: TBitBtn
            Left = 1
            Top = 2
            Width = 103
            Height = 40
            Cursor = crHandPoint
            Caption = '&Incluir'
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
            NumGlyphs = 2
          end
          object BBtnAlterar: TBitBtn
            Left = 1
            Top = 42
            Width = 103
            Height = 40
            Cursor = crHandPoint
            Caption = '&Alterar'
            TabOrder = 1
            OnClick = BBtnAlterarClick
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
            NumGlyphs = 2
          end
          object BbtnExcluir: TBitBtn
            Left = 1
            Top = 82
            Width = 103
            Height = 40
            Cursor = crHandPoint
            Caption = '&Excluir'
            TabOrder = 2
            OnClick = BbtnExcluirClick
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
            NumGlyphs = 2
          end
          object BbtnImprimir: TBitBtn
            Left = 1
            Top = 122
            Width = 103
            Height = 40
            Cursor = crHandPoint
            Caption = '&Imprimir'
            TabOrder = 3
            OnClick = BbtnImprimirClick
            Glyph.Data = {
              76010000424D7601000000000000760000002800000020000000100000000100
              04000000000000010000130B0000130B00001000000000000000000000000000
              800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00300000000000
              00033FFFFFFFFFFFFFFF0888888888888880777777777777777F088888888888
              8880777777777777777F0000000000000000FFFFFFFFFFFFFFFF0F8F8F8F8F8F
              8F80777777777777777F08F8F8F8F8F8F9F0777777777777777F0F8F8F8F8F8F
              8F807777777777777F7F0000000000000000777777777777777F3330FFFFFFFF
              03333337F3FFFF3F7F333330F0000F0F03333337F77773737F333330FFFFFFFF
              03333337F3FF3FFF7F333330F00F000003333337F773777773333330FFFF0FF0
              33333337F3FF7F3733333330F08F0F0333333337F7737F7333333330FFFF0033
              33333337FFFF7733333333300000033333333337777773333333}
            NumGlyphs = 2
          end
          object BBtnFechat: TBitBtn
            Left = 1
            Top = 162
            Width = 103
            Height = 40
            Cursor = crHandPoint
            Caption = '&Fechar'
            TabOrder = 4
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
            NumGlyphs = 2
          end
        end
        object Panel5: TPanel
          Left = 0
          Top = 0
          Width = 857
          Height = 367
          Align = alClient
          TabOrder = 1
          object Panel6: TPanel
            Left = 1
            Top = 1
            Width = 855
            Height = 168
            Align = alTop
            Caption = 'Panel6'
            TabOrder = 0
            object DBGrid1: TDBGrid
              Left = 1
              Top = 1
              Width = 853
              Height = 166
              Align = alClient
              Color = clInfoBk
              DataSource = DSQualquer
              TabOrder = 0
              TitleFont.Charset = ANSI_CHARSET
              TitleFont.Color = clWindowText
              TitleFont.Height = -13
              TitleFont.Name = 'Arial'
              TitleFont.Style = []
              Columns = <
                item
                  Expanded = False
                  FieldName = 'CodMovPedido'
                  Title.Caption = 'C'#243'digo'
                  Width = 48
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'CodigoPedido'
                  Title.Caption = 'Pedido Cl'#237'nica'
                  Width = 90
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Cliente'
                  Title.Caption = 'Clinica Veterin'#225'ria'
                  Width = 290
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'NomeAnimal'
                  Title.Caption = 'Nome do Animal'
                  Width = 156
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Proprietario'
                  Title.Caption = 'Propriet'#225'rio'
                  Width = 172
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Idade'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'SexoAnimal'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'nomeespecie'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'DataPedido'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'HoraPedido'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'DataEnvio'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Retirar'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Status'
                  Visible = True
                end>
            end
          end
          object Panel7: TPanel
            Left = 1
            Top = 169
            Width = 855
            Height = 197
            Align = alClient
            Caption = 'Panel7'
            TabOrder = 1
            object Panel8: TPanel
              Left = 1
              Top = 1
              Width = 853
              Height = 32
              Align = alTop
              TabOrder = 0
              object Label7: TLabel
                Left = 16
                Top = 8
                Width = 119
                Height = 18
                Caption = '<<< Exames >>>'
                Font.Charset = ANSI_CHARSET
                Font.Color = clWindowText
                Font.Height = -16
                Font.Name = 'Arial'
                Font.Style = []
                ParentFont = False
              end
            end
            object Panel9: TPanel
              Left = 746
              Top = 33
              Width = 108
              Height = 163
              Align = alRight
              TabOrder = 1
              object BbtnIncluirItens: TBitBtn
                Left = 1
                Top = 2
                Width = 103
                Height = 40
                Cursor = crHandPoint
                Caption = '&Incluir Exame'
                Font.Charset = ANSI_CHARSET
                Font.Color = clWindowText
                Font.Height = -11
                Font.Name = 'Arial'
                Font.Style = []
                ParentFont = False
                TabOrder = 0
                OnClick = BbtnIncluirItensClick
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
                NumGlyphs = 2
              end
              object BbtnAlterarItens: TBitBtn
                Left = 1
                Top = 42
                Width = 103
                Height = 40
                Cursor = crHandPoint
                Caption = '&Alterar Exame'
                Font.Charset = ANSI_CHARSET
                Font.Color = clWindowText
                Font.Height = -11
                Font.Name = 'Arial'
                Font.Style = []
                ParentFont = False
                TabOrder = 1
                OnClick = BbtnAlterarItensClick
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
                NumGlyphs = 2
              end
              object BbtnExcluirItens: TBitBtn
                Left = 1
                Top = 82
                Width = 103
                Height = 40
                Cursor = crHandPoint
                Caption = '&Excluir Exame'
                Font.Charset = ANSI_CHARSET
                Font.Color = clWindowText
                Font.Height = -11
                Font.Name = 'Arial'
                Font.Style = []
                ParentFont = False
                TabOrder = 2
                OnClick = BbtnExcluirItensClick
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
                NumGlyphs = 2
              end
            end
            object Panel10: TPanel
              Left = 1
              Top = 33
              Width = 745
              Height = 163
              Align = alClient
              TabOrder = 2
              object Panel12: TPanel
                Left = 401
                Top = 1
                Width = 343
                Height = 161
                Align = alClient
                Caption = 'Panel12'
                TabOrder = 0
                object Panel14: TPanel
                  Left = 1
                  Top = 1
                  Width = 341
                  Height = 32
                  Align = alTop
                  Caption = 'Itens do Exame < Lan'#231'amento Autom'#225'tico>'
                  TabOrder = 0
                end
                object DBGrid3: TDBGrid
                  Left = 1
                  Top = 33
                  Width = 341
                  Height = 127
                  Align = alClient
                  Color = clInfoBk
                  DataSource = DSMovItensExames
                  TabOrder = 1
                  TitleFont.Charset = ANSI_CHARSET
                  TitleFont.Color = clWindowText
                  TitleFont.Height = -13
                  TitleFont.Name = 'Arial'
                  TitleFont.Style = []
                  Columns = <
                    item
                      Expanded = False
                      FieldName = 'NomeItemExame'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'Referencia1'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'Referencia2'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'Unidade'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'DigitaCampo'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'Obrigatorio'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'Minimo'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'Maximo'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'TipoCampo'
                      Visible = True
                    end>
                end
              end
              object Panel13: TPanel
                Left = 1
                Top = 1
                Width = 400
                Height = 161
                Align = alLeft
                Caption = 'Panel13'
                TabOrder = 1
                object DBGrid2: TDBGrid
                  Left = 1
                  Top = 1
                  Width = 398
                  Height = 159
                  Align = alClient
                  Color = clInfoBk
                  DataSource = DSMovExames
                  TabOrder = 0
                  TitleFont.Charset = ANSI_CHARSET
                  TitleFont.Color = clWindowText
                  TitleFont.Height = -13
                  TitleFont.Name = 'Arial'
                  TitleFont.Style = []
                  Columns = <
                    item
                      Expanded = False
                      FieldName = 'NomeExameReduz'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'NomeExame'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'DataProvResultado'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'Dias_Elaboracao_Exame'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'ImprimirSeparado'
                      Visible = True
                    end
                    item
                      Expanded = False
                      FieldName = 'Material'
                      Visible = True
                    end>
                end
              end
            end
          end
        end
      end
      object TSManutencao: TTabSheet
        Caption = 'Manuten'#231#227'o'
        ImageIndex = 1
        object Panel4: TPanel
          Left = 855
          Top = 0
          Width = 107
          Height = 367
          Align = alRight
          TabOrder = 0
          object BBtnGravar: TBitBtn
            Left = 2
            Top = 2
            Width = 103
            Height = 40
            Cursor = crHandPoint
            Caption = '&Gravar'
            TabOrder = 0
            OnClick = BBtnGravarClick
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
            NumGlyphs = 2
          end
          object BBtnCancelar: TBitBtn
            Left = 2
            Top = 42
            Width = 103
            Height = 40
            Cursor = crHandPoint
            Caption = '&Cancelar'
            TabOrder = 1
            OnClick = BBtnCancelarClick
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
            NumGlyphs = 2
          end
        end
        object ScrollBox1: TScrollBox
          Left = 0
          Top = 0
          Width = 855
          Height = 367
          Align = alClient
          Font.Charset = ANSI_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = []
          ParentFont = False
          TabOrder = 1
          object Label3: TLabel
            Left = 32
            Top = 8
            Width = 55
            Height = 16
            Caption = 'Protocolo'
            FocusControl = DBEdit2
          end
          object Label6: TLabel
            Left = 32
            Top = 56
            Width = 67
            Height = 16
            Caption = 'DataPedido'
          end
          object Label18: TLabel
            Left = 192
            Top = 8
            Width = 37
            Height = 16
            Caption = 'Senha'
            FocusControl = DBEdit15
          end
          object Label8: TLabel
            Left = 240
            Top = 56
            Width = 45
            Height = 16
            Caption = 'Contato'
            FocusControl = DBEdit6
          end
          object Label2: TLabel
            Left = 176
            Top = 56
            Width = 27
            Height = 16
            Caption = 'Hora'
          end
          object Label5: TLabel
            Left = 32
            Top = 102
            Width = 104
            Height = 16
            Caption = 'Cl'#237'nica Veterin'#225'ria'
          end
          object Label10: TLabel
            Left = 32
            Top = 150
            Width = 61
            Height = 16
            Caption = 'Veterin'#225'rio'
          end
          object Label4: TLabel
            Left = 32
            Top = 202
            Width = 47
            Height = 16
            Caption = 'Esp'#233'cie'
          end
          object Label15: TLabel
            Left = 32
            Top = 248
            Width = 95
            Height = 16
            Caption = 'Nome do Animal'
            FocusControl = DBEdit1
          end
          object Label12: TLabel
            Left = 304
            Top = 245
            Width = 66
            Height = 16
            Caption = 'Propriet'#225'rio'
            FocusControl = DBEdit1
          end
          object Label13: TLabel
            Left = 32
            Top = 300
            Width = 176
            Height = 16
            Caption = 'Sexo Animal (M)acho (F)'#234'mea'
            FocusControl = DBEdit1
          end
          object Label11: TLabel
            Left = 240
            Top = 300
            Width = 31
            Height = 16
            Caption = 'Idade'
            FocusControl = DBEdit1
          end
          object Label14: TLabel
            Left = 520
            Top = 56
            Width = 201
            Height = 16
            Caption = 'N'#250'mero de Controle do Laborat'#243'rio'
            FocusControl = DBEdit6
          end
          object Label16: TLabel
            Left = 344
            Top = 300
            Width = 30
            Height = 16
            Caption = 'Ra'#231'a'
            FocusControl = DBEdit1
          end
          object DBEdit2: TDBEdit
            Left = 32
            Top = 24
            Width = 153
            Height = 24
            DataField = 'CodigoInterno'
            DataSource = DSQualquer
            Enabled = False
            TabOrder = 11
          end
          object DBEdit15: TDBEdit
            Left = 192
            Top = 24
            Width = 153
            Height = 24
            DataField = 'Senha'
            DataSource = DSQualquer
            Enabled = False
            TabOrder = 12
          end
          object DBEdit6: TDBEdit
            Left = 32
            Top = 264
            Width = 264
            Height = 24
            CharCase = ecUpperCase
            DataField = 'NomeAnimal'
            DataSource = DSQualquer
            TabOrder = 6
          end
          object DBDateEdit1: TDBDateEdit
            Left = 32
            Top = 72
            Width = 121
            Height = 24
            DataField = 'DataPedido'
            DataSource = DSQualquer
            NumGlyphs = 2
            TabOrder = 0
            YearDigits = dyFour
          end
          object MedHora: TMaskEdit
            Left = 176
            Top = 72
            Width = 49
            Height = 24
            EditMask = '!90:00;1;_'
            MaxLength = 5
            TabOrder = 1
            Text = '  :  '
          end
          object RxDBLookupCombo3: TRxDBLookupCombo
            Left = 32
            Top = 121
            Width = 473
            Height = 23
            DropDownCount = 8
            DataField = 'CodCliente'
            DataSource = DSQualquer
            LookupField = 'CodCliente'
            LookupDisplay = 'Nome'
            LookupSource = DSCliente
            TabOrder = 3
            OnChange = RxDBLookupCombo3Change
            OnExit = RxDBLookupCombo3Change
          end
          object RxDBLookupCombo4: TRxDBLookupCombo
            Left = 32
            Top = 169
            Width = 473
            Height = 23
            DropDownCount = 8
            DataField = 'CodProfSolic'
            DataSource = DSQualquer
            LookupField = 'CodProfSolic'
            LookupDisplay = 'NomeProfSolic'
            LookupSource = DSPRofSolic
            TabOrder = 4
          end
          object DBCheckBox1: TDBCheckBox
            Left = 480
            Top = 16
            Width = 161
            Height = 17
            Caption = 'Retirar no Solicitante'
            DataField = 'Retirar'
            DataSource = DSQualquer
            TabOrder = 10
            ValueChecked = 'Sim'
            ValueUnchecked = 'N'#227'o'
          end
          object RxDBLookupCombo5: TRxDBLookupCombo
            Left = 32
            Top = 221
            Width = 471
            Height = 23
            DropDownCount = 8
            DataField = 'CodEspecie'
            DataSource = DSQualquer
            LookupField = 'CodEspecie'
            LookupDisplay = 'NomeEspecie'
            LookupSource = DsEspecie
            TabOrder = 5
          end
          object DBEdit1: TDBEdit
            Left = 240
            Top = 72
            Width = 264
            Height = 24
            CharCase = ecUpperCase
            DataField = 'Contato'
            DataSource = DSQualquer
            TabOrder = 2
          end
          object DBEdit3: TDBEdit
            Left = 304
            Top = 261
            Width = 264
            Height = 24
            CharCase = ecUpperCase
            DataField = 'Proprietario'
            DataSource = DSQualquer
            TabOrder = 7
          end
          object DBEdit4: TDBEdit
            Left = 72
            Top = 316
            Width = 73
            Height = 24
            CharCase = ecUpperCase
            DataField = 'SexoAnimal'
            DataSource = DSQualquer
            TabOrder = 8
            OnChange = DBEdit4Change
          end
          object DBEdit5: TDBEdit
            Left = 240
            Top = 316
            Width = 73
            Height = 24
            CharCase = ecUpperCase
            DataField = 'Idade'
            DataSource = DSQualquer
            TabOrder = 9
          end
          object DBEdit7: TDBEdit
            Left = 520
            Top = 72
            Width = 129
            Height = 24
            CharCase = ecUpperCase
            DataField = 'CodigoPedido'
            DataSource = DSQualquer
            TabOrder = 13
          end
          object DBEdit8: TDBEdit
            Left = 344
            Top = 316
            Width = 217
            Height = 24
            CharCase = ecUpperCase
            DataField = 'Raca'
            DataSource = DSQualquer
            TabOrder = 14
          end
        end
      end
      object TSItens: TTabSheet
        Caption = 'Itens'
        ImageIndex = 2
        object Panel11: TPanel
          Left = 850
          Top = 0
          Width = 112
          Height = 367
          Align = alRight
          TabOrder = 0
          object BitBtn1: TBitBtn
            Left = 2
            Top = 2
            Width = 108
            Height = 40
            Cursor = crHandPoint
            Caption = '&Gravar Exame'
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -11
            Font.Name = 'Arial'
            Font.Style = []
            ParentFont = False
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
            NumGlyphs = 2
          end
          object BbtnCancelaItens: TBitBtn
            Left = 2
            Top = 42
            Width = 108
            Height = 40
            Cursor = crHandPoint
            Caption = '&Cancelar Exame'
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -11
            Font.Name = 'Arial'
            Font.Style = []
            ParentFont = False
            TabOrder = 1
            OnClick = BbtnCancelaItensClick
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
            NumGlyphs = 2
          end
        end
        object ScrollBox2: TScrollBox
          Left = 0
          Top = 0
          Width = 850
          Height = 367
          Align = alClient
          TabOrder = 1
          object Label37: TLabel
            Left = 40
            Top = 76
            Width = 46
            Height = 16
            Caption = 'Material'
            FocusControl = DBEdit16
          end
          object Label24: TLabel
            Left = 40
            Top = 16
            Width = 41
            Height = 16
            Caption = 'Exame'
          end
          object DBEdit16: TDBEdit
            Left = 40
            Top = 92
            Width = 345
            Height = 24
            DataField = 'Material'
            DataSource = DSMovExames
            TabOrder = 0
          end
          object RxDBLookupCombo6: TRxDBLookupCombo
            Left = 40
            Top = 40
            Width = 659
            Height = 23
            DropDownCount = 8
            DataField = 'CodExame'
            DataSource = DSMovExames
            LookupField = 'CodExame'
            LookupDisplay = 'NomeExame'
            LookupSource = DSExames
            TabOrder = 1
            OnChange = RxDBLookupCombo6Change
            OnExit = RxDBLookupCombo6Change
          end
          object Panel15: TPanel
            Left = 0
            Top = 123
            Width = 846
            Height = 240
            Align = alBottom
            Caption = 'Panel15'
            TabOrder = 2
            object DBGrid4: TDBGrid
              Left = 1
              Top = 1
              Width = 844
              Height = 238
              Align = alClient
              Color = clInfoBk
              DataSource = DSExamesItens
              TabOrder = 0
              TitleFont.Charset = ANSI_CHARSET
              TitleFont.Color = clWindowText
              TitleFont.Height = -13
              TitleFont.Name = 'Arial'
              TitleFont.Style = []
              Columns = <
                item
                  Expanded = False
                  FieldName = 'OrdemApresentacao'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'NomeItemExame'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Referencia1'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Unidade1'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Referencia2'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Unidade2'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'DigitaCampo'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Minimo'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Maximo'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Obrigatorio'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'TipoCampo'
                  Visible = True
                end>
            end
          end
        end
      end
    end
  end
  object QryQualquer: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      
        'Select Mp.*, C.Nome as Cliente, e.nomeespecie, year(mp.datapedid' +
        'o) as Ano'
      'From MovPedido Mp '
      
        '                 Left join Cliente c on mp.codcliente = c.codcli' +
        'ente'
      
        '                Left Join Especie e on mp.codespecie = e.codespe' +
        'cie'
      'Where '
      '(MP.codcliente = :codcliente or :codcliente = -1)'
      'and'
      '(MP.codespecie = :codespecie or :codespecie = -1)'
      'and'
      ''
      '(MP.nomeAnimal like :NomeAnimal or :NomeAnimal  = '#39'-1'#39')'
      'and'
      '(MP.Proprietario like :Proprietario or :Proprietario  = '#39'-1'#39')'
      'and'
      '(MP.Idade like :IdadeAnimal or :IdadeAnimal  = '#39'-1'#39')'
      'and'
      '(MP.SexoAnimal like :SexoAnimal or :SexoAnimal  = '#39'-1'#39')'
      'and'
      '(MP.CodigoPedido = :CodigoPedido or :CodigoPedido  = -1)'
      'and'
      ''
      ''
      ''
      ''
      '(MP.DataPedido between :dti and :dtf)'
      'and'
      '(MP.codMovpedido = :codmovpedido or :codmovpedido = -1) '
      'and'
      
        '(MP.CodigoInterno like :codigointerno or :codigointerno like  '#39'-' +
        '1'#39')'
      'and'
      '(MP.status = :status)'
      'Order by MP.DataPedido')
    UpdateObject = UDPQualquer
    Left = 365
    Top = 125
    ParamData = <
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
        Name = 'codespecie'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codespecie'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'NomeAnimal'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'NomeAnimal'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'Proprietario'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'Proprietario'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'IdadeAnimal'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'IdadeAnimal'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'SexoAnimal'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'SexoAnimal'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'CodigoPedido'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'CodigoPedido'
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
      end
      item
        DataType = ftInteger
        Name = 'codmovpedido'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codmovpedido'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'codigointerno'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'codigointerno'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'status'
        ParamType = ptInput
      end>
    object QryQualquerCodMovPedido: TAutoIncField
      FieldName = 'CodMovPedido'
    end
    object QryQualquerCodigoInterno: TStringField
      FieldName = 'CodigoInterno'
      FixedChar = True
    end
    object QryQualquerCodigoPedido: TIntegerField
      FieldName = 'CodigoPedido'
    end
    object QryQualquerSenha: TStringField
      FieldName = 'Senha'
      FixedChar = True
    end
    object QryQualquerCodCliente: TIntegerField
      FieldName = 'CodCliente'
    end
    object QryQualquerCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
    end
    object QryQualquerCodProfSolic: TIntegerField
      FieldName = 'CodProfSolic'
    end
    object QryQualquerCodProfLaudo: TIntegerField
      FieldName = 'CodProfLaudo'
    end
    object QryQualquerAssinaturaScanner: TStringField
      FieldName = 'AssinaturaScanner'
      FixedChar = True
      Size = 1
    end
    object QryQualquerDataPedido: TDateTimeField
      FieldName = 'DataPedido'
    end
    object QryQualquerHoraPedido: TStringField
      FieldName = 'HoraPedido'
      FixedChar = True
      Size = 5
    end
    object QryQualquerDataEnvio: TDateTimeField
      FieldName = 'DataEnvio'
    end
    object QryQualquerValorTotal: TFloatField
      FieldName = 'ValorTotal'
    end
    object QryQualquerPago: TStringField
      FieldName = 'Pago'
      FixedChar = True
      Size = 1
    end
    object QryQualquerFormadeEnvio: TStringField
      FieldName = 'FormadeEnvio'
      FixedChar = True
      Size = 15
    end
    object QryQualquerRetirar: TStringField
      FieldName = 'Retirar'
      FixedChar = True
      Size = 1
    end
    object QryQualquerRetirado: TStringField
      FieldName = 'Retirado'
      FixedChar = True
      Size = 1
    end
    object QryQualquerContato: TStringField
      FieldName = 'Contato'
      FixedChar = True
    end
    object QryQualquerStatus: TStringField
      FieldName = 'Status'
      FixedChar = True
      Size = 1
    end
    object QryQualquerCodSeqContas: TIntegerField
      FieldName = 'CodSeqContas'
    end
    object QryQualquerNomeAnimal: TStringField
      FieldName = 'NomeAnimal'
      FixedChar = True
    end
    object QryQualquerProprietario: TStringField
      FieldName = 'Proprietario'
      FixedChar = True
      Size = 50
    end
    object QryQualquerIdade: TStringField
      FieldName = 'Idade'
      FixedChar = True
      Size = 10
    end
    object QryQualquerSexoAnimal: TStringField
      FieldName = 'SexoAnimal'
      FixedChar = True
      Size = 1
    end
    object QryQualquerCliente: TStringField
      FieldName = 'Cliente'
      FixedChar = True
      Size = 50
    end
    object QryQualquernomeespecie: TStringField
      FieldName = 'nomeespecie'
      FixedChar = True
    end
    object QryQualquerDataLiberacao: TDateTimeField
      FieldName = 'DataLiberacao'
    end
    object QryQualquerRaca: TStringField
      FieldName = 'Raca'
      FixedChar = True
      Size = 15
    end
    object QryQualquerAno: TIntegerField
      FieldName = 'Ano'
    end
  end
  object UDPQualquer: TUpdateSQL
    ModifySQL.Strings = (
      'update MovPedido'
      'set'
      '  CodigoInterno = :CodigoInterno,'
      '  CodigoPedido = :CodigoPedido,'
      '  Senha = :Senha,'
      '  CodCliente = :CodCliente,'
      '  CodEspecie = :CodEspecie,'
      '  CodProfSolic = :CodProfSolic,'
      '  CodProfLaudo = :CodProfLaudo,'
      '  AssinaturaScanner = :AssinaturaScanner,'
      '  DataPedido = :DataPedido,'
      '  HoraPedido = :HoraPedido,'
      '  DataEnvio = :DataEnvio,'
      '  ValorTotal = :ValorTotal,'
      '  Pago = :Pago,'
      '  FormadeEnvio = :FormadeEnvio,'
      '  Retirar = :Retirar,'
      '  Retirado = :Retirado,'
      '  Contato = :Contato,'
      '  Status = :Status,'
      '  CodSeqContas = :CodSeqContas,'
      '  NomeAnimal = :NomeAnimal,'
      '  Proprietario = :Proprietario,'
      '  Idade = :Idade,'
      '  SexoAnimal = :SexoAnimal,'
      '  Raca = :Raca'
      'where'
      '  CodMovPedido = :OLD_CodMovPedido')
    InsertSQL.Strings = (
      'insert into MovPedido'
      
        '  (CodigoInterno, CodigoPedido, Senha, CodCliente, CodEspecie, C' +
        'odProfSolic, '
      
        '   CodProfLaudo, AssinaturaScanner, DataPedido, HoraPedido, Data' +
        'Envio, '
      
        '   ValorTotal, Pago, FormadeEnvio, Retirar, Retirado, Contato, S' +
        'tatus, '
      
        '   CodSeqContas, NomeAnimal, Proprietario, Idade, SexoAnimal, Ra' +
        'ca)'
      'values'
      
        '  (:CodigoInterno, :CodigoPedido, :Senha, :CodCliente, :CodEspec' +
        'ie, :CodProfSolic, '
      
        '   :CodProfLaudo, :AssinaturaScanner, :DataPedido, :HoraPedido, ' +
        ':DataEnvio, '
      
        '   :ValorTotal, :Pago, :FormadeEnvio, :Retirar, :Retirado, :Cont' +
        'ato, :Status, '
      
        '   :CodSeqContas, :NomeAnimal, :Proprietario, :Idade, :SexoAnima' +
        'l, :Raca)')
    DeleteSQL.Strings = (
      'delete from MovPedido'
      'where'
      '  CodMovPedido = :OLD_CodMovPedido')
    Left = 389
    Top = 165
  end
  object DSQualquer: TDataSource
    AutoEdit = False
    DataSet = QryQualquer
    OnDataChange = DSQualquerDataChange
    Left = 421
    Top = 125
  end
  object QryCliente: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Cliente'
      'Order by Nome')
    Left = 621
    Top = 234
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
    OnDataChange = DSClienteDataChange
    Left = 661
    Top = 234
  end
  object QryEspecie: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Especie '
      'Order by NomeEspecie')
    Left = 621
    Top = 266
    object QryEspecieCodEspecie: TAutoIncField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.Especie.CodEspecie'
    end
    object QryEspecieNomeEspecie: TStringField
      FieldName = 'NomeEspecie'
      Origin = 'DNLABVET.Especie.NomeEspecie'
      FixedChar = True
    end
  end
  object DsEspecie: TDataSource
    AutoEdit = False
    DataSet = QryEspecie
    Left = 661
    Top = 266
  end
  object QryMovExames: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select Me.*'
      'From MovExames Me '
      'Where '
      '(me.CodMovPedido = :CodMovPedido)')
    UpdateObject = UPDItens
    Left = 389
    Top = 269
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodMovPedido'
        ParamType = ptInput
      end>
    object QryMovExamesCodMovExames: TAutoIncField
      FieldName = 'CodMovExames'
      Origin = 'DNLABVET.MovExames.CodMovExames'
    end
    object QryMovExamesCodMovPedido: TIntegerField
      FieldName = 'CodMovPedido'
      Origin = 'DNLABVET.MovExames.CodMovPedido'
    end
    object QryMovExamesCodExame: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.MovExames.CodExame'
    end
    object QryMovExamesDataProvResultado: TDateTimeField
      FieldName = 'DataProvResultado'
      Origin = 'DNLABVET.MovExames.DataProvResultado'
    end
    object QryMovExamesDataResultado: TDateTimeField
      FieldName = 'DataResultado'
      Origin = 'DNLABVET.MovExames.DataResultado'
    end
    object QryMovExamesValor: TFloatField
      FieldName = 'Valor'
      Origin = 'DNLABVET.MovExames.Valor'
    end
    object QryMovExamesObservacao: TMemoField
      FieldName = 'Observacao'
      Origin = 'DNLABVET.MovExames.Observacao'
      BlobType = ftMemo
    end
    object QryMovExamesCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.MovExames.CodEspecie'
    end
    object QryMovExamesNomeExame: TStringField
      FieldName = 'NomeExame'
      Origin = 'DNLABVET.MovExames.NomeExame'
      FixedChar = True
      Size = 50
    end
    object QryMovExamesNomeExameReduz: TStringField
      FieldName = 'NomeExameReduz'
      Origin = 'DNLABVET.MovExames.NomeExameReduz'
      FixedChar = True
      Size = 10
    end
    object QryMovExamesDias_Elaboracao_Exame: TIntegerField
      FieldName = 'Dias_Elaboracao_Exame'
      Origin = 'DNLABVET.MovExames.Dias_Elaboracao_Exame'
    end
    object QryMovExamesImprimirSeparado: TStringField
      FieldName = 'ImprimirSeparado'
      Origin = 'DNLABVET.MovExames.ImprimirSeparado'
      FixedChar = True
      Size = 1
    end
    object QryMovExamesMetodo: TStringField
      FieldName = 'Metodo'
      Origin = 'DNLABVET.MovExames.Metodo'
      FixedChar = True
    end
    object QryMovExamesMaterial: TStringField
      FieldName = 'Material'
      Origin = 'DNLABVET.MovExames.Material'
      FixedChar = True
      Size = 50
    end
    object QryMovExamesLiberado: TStringField
      FieldName = 'Liberado'
      Origin = 'DNLABVET.MovExames.Liberado'
      FixedChar = True
      Size = 1
    end
  end
  object DSMovExames: TDataSource
    AutoEdit = False
    DataSet = QryMovExames
    OnDataChange = DSMovExamesDataChange
    Left = 429
    Top = 269
  end
  object UPDItens: TUpdateSQL
    ModifySQL.Strings = (
      'update MovExames'
      'set'
      '  CodMovPedido = :CodMovPedido,'
      '  CodExame = :CodExame,'
      '  DataProvResultado = :DataProvResultado,'
      '  DataResultado = :DataResultado,'
      '  Valor = :Valor,'
      '  Observacao = :Observacao,'
      '  CodEspecie = :CodEspecie,'
      '  NomeExame = :NomeExame,'
      '  NomeExameReduz = :NomeExameReduz,'
      '  Dias_Elaboracao_Exame = :Dias_Elaboracao_Exame,'
      '  ImprimirSeparado = :ImprimirSeparado,'
      '  Metodo = :Metodo,'
      '  Material = :Material,'
      '  Liberado = :Liberado'
      'where'
      '  CodMovExames = :OLD_CodMovExames')
    InsertSQL.Strings = (
      'insert into MovExames'
      
        '  (CodMovPedido, CodExame, DataProvResultado, DataResultado, Val' +
        'or, Observacao, '
      
        '   CodEspecie, NomeExame, NomeExameReduz, Dias_Elaboracao_Exame,' +
        ' ImprimirSeparado, '
      '   Metodo, Material, Liberado)'
      'values'
      
        '  (:CodMovPedido, :CodExame, :DataProvResultado, :DataResultado,' +
        ' :Valor, '
      
        '   :Observacao, :CodEspecie, :NomeExame, :NomeExameReduz, :Dias_' +
        'Elaboracao_Exame, '
      '   :ImprimirSeparado, :Metodo, :Material, :Liberado)')
    DeleteSQL.Strings = (
      'delete from MovExames'
      'where'
      '  CodMovExames = :OLD_CodMovExames')
    Left = 405
    Top = 301
  end
  object QryExameItensSeq: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select Ex.*'
      'From ExamesItensParam Ex '
      'Where '
      '(Ex.CodExame = :CodExame)'
      'Order by Ex.OrdemApresentacao desc')
    Left = 765
    Top = 149
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodExame'
        ParamType = ptInput
      end>
    object QryExameItensSeqCodItensExame: TAutoIncField
      FieldName = 'CodItensExame'
      Origin = 'DNLABVET.ExamesItensParam.CodItensExame'
    end
    object QryExameItensSeqCodExame: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.ExamesItensParam.CodExame'
    end
    object QryExameItensSeqOrdemApresentacao: TIntegerField
      FieldName = 'OrdemApresentacao'
      Origin = 'DNLABVET.ExamesItensParam.OrdemApresentacao'
    end
    object QryExameItensSeqNomeItemExame: TStringField
      FieldName = 'NomeItemExame'
      Origin = 'DNLABVET.ExamesItensParam.NomeItemExame'
      FixedChar = True
    end
    object QryExameItensSeqReferencia: TStringField
      FieldName = 'Referencia'
      Origin = 'DNLABVET.ExamesItensParam.Referencia'
      FixedChar = True
      Size = 30
    end
    object QryExameItensSeqUnidade: TStringField
      FieldName = 'Unidade'
      Origin = 'DNLABVET.ExamesItensParam.Unidade'
      FixedChar = True
      Size = 10
    end
    object QryExameItensSeqDigitaCampo: TStringField
      FieldName = 'DigitaCampo'
      Origin = 'DNLABVET.ExamesItensParam.DigitaCampo'
      FixedChar = True
      Size = 1
    end
    object QryExameItensSeqMinimo: TFloatField
      FieldName = 'Minimo'
      Origin = 'DNLABVET.ExamesItensParam.Minimo'
    end
    object QryExameItensSeqMaximo: TFloatField
      FieldName = 'Maximo'
      Origin = 'DNLABVET.ExamesItensParam.Maximo'
    end
    object QryExameItensSeqObrigatorio: TStringField
      FieldName = 'Obrigatorio'
      Origin = 'DNLABVET.ExamesItensParam.Obrigatorio'
      FixedChar = True
      Size = 1
    end
    object QryExameItensSeqTipoCampo: TStringField
      FieldName = 'TipoCampo'
      Origin = 'DNLABVET.ExamesItensParam.TipoCampo'
      FixedChar = True
      Size = 1
    end
  end
  object QryProfSolic: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From ProfissionalSolicitante'
      'Order by NomeProfSolic')
    Left = 621
    Top = 306
    object QryProfSolicCodProfSolic: TAutoIncField
      FieldName = 'CodProfSolic'
      Origin = 'DNLABVET.ProfissionalSolicitante.CodProfSolic'
    end
    object QryProfSolicAbrevConselho: TStringField
      FieldName = 'AbrevConselho'
      Origin = 'DNLABVET.ProfissionalSolicitante.AbrevConselho'
      FixedChar = True
      Size = 10
    end
    object QryProfSolicNomeProfSolic: TStringField
      FieldName = 'NomeProfSolic'
      Origin = 'DNLABVET.ProfissionalSolicitante.NomeProfSolic'
      FixedChar = True
      Size = 50
    end
    object QryProfSolicNumConselho: TStringField
      FieldName = 'NumConselho'
      Origin = 'DNLABVET.ProfissionalSolicitante.NumConselho'
      FixedChar = True
      Size = 15
    end
    object QryProfSolicEmail: TStringField
      FieldName = 'Email'
      Origin = 'DNLABVET.ProfissionalSolicitante.Email'
      FixedChar = True
      Size = 200
    end
    object QryProfSolicTelefone: TStringField
      FieldName = 'Telefone'
      Origin = 'DNLABVET.ProfissionalSolicitante.Telefone'
      FixedChar = True
      Size = 15
    end
    object QryProfSolicCelular: TStringField
      FieldName = 'Celular'
      Origin = 'DNLABVET.ProfissionalSolicitante.Celular'
      FixedChar = True
      Size = 15
    end
    object QryProfSolicNascimento: TDateTimeField
      FieldName = 'Nascimento'
      Origin = 'DNLABVET.ProfissionalSolicitante.Nascimento'
    end
    object QryProfSolicativo: TStringField
      FieldName = 'ativo'
      Origin = 'DNLABVET.ProfissionalSolicitante.ativo'
      FixedChar = True
      Size = 1
    end
  end
  object DSPRofSolic: TDataSource
    AutoEdit = False
    DataSet = QryProfSolic
    Left = 661
    Top = 306
  end
  object QryExames: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Exames'
      'Where CodEspecie = :CodEspecie'
      'Order by NomeExame')
    Left = 621
    Top = 338
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodEspecie'
        ParamType = ptInput
      end>
    object QryExamesCodExame: TAutoIncField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.Exames.CodExame'
    end
    object QryExamesCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.Exames.CodEspecie'
    end
    object QryExamesNomeExame: TStringField
      FieldName = 'NomeExame'
      Origin = 'DNLABVET.Exames.NomeExame'
      FixedChar = True
      Size = 50
    end
    object QryExamesNomeExameReduz: TStringField
      FieldName = 'NomeExameReduz'
      Origin = 'DNLABVET.Exames.NomeExameReduz'
      FixedChar = True
      Size = 10
    end
    object QryExamesValor: TFloatField
      FieldName = 'Valor'
      Origin = 'DNLABVET.Exames.Valor'
    end
    object QryExamesDias_Elaboracao_Exame: TIntegerField
      FieldName = 'Dias_Elaboracao_Exame'
      Origin = 'DNLABVET.Exames.Dias_Elaboracao_Exame'
    end
    object QryExamesImprimirSeparado: TStringField
      FieldName = 'ImprimirSeparado'
      Origin = 'DNLABVET.Exames.ImprimirSeparado'
      FixedChar = True
      Size = 1
    end
    object QryExamesMetodo: TStringField
      FieldName = 'Metodo'
      Origin = 'DNLABVET.Exames.Metodo'
      FixedChar = True
    end
    object QryExamesMaterial: TStringField
      FieldName = 'Material'
      Origin = 'DNLABVET.Exames.Material'
      FixedChar = True
      Size = 10
    end
  end
  object DSExames: TDataSource
    AutoEdit = False
    DataSet = QryExames
    OnDataChange = DSExamesDataChange
    Left = 661
    Top = 338
  end
  object QryExamesItens: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From ExamesItensParam'
      'Where CodExame = :CodExame'
      'Order by OrdemApresentacao')
    Left = 621
    Top = 378
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodExame'
        ParamType = ptInput
      end>
    object QryExamesItensCodItensExame: TAutoIncField
      FieldName = 'CodItensExame'
      Origin = 'DNLABVET.ExamesItensParam.CodItensExame'
    end
    object QryExamesItensCodExame: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.ExamesItensParam.CodExame'
    end
    object QryExamesItensOrdemApresentacao: TIntegerField
      FieldName = 'OrdemApresentacao'
      Origin = 'DNLABVET.ExamesItensParam.OrdemApresentacao'
    end
    object QryExamesItensNomeItemExame: TStringField
      FieldName = 'NomeItemExame'
      Origin = 'DNLABVET.ExamesItensParam.NomeItemExame'
      FixedChar = True
      Size = 30
    end
    object QryExamesItensReferencia1: TStringField
      FieldName = 'Referencia1'
      Origin = 'DNLABVET.ExamesItensParam.Referencia1'
      FixedChar = True
      Size = 15
    end
    object QryExamesItensReferencia2: TStringField
      FieldName = 'Referencia2'
      Origin = 'DNLABVET.ExamesItensParam.Referencia2'
      FixedChar = True
      Size = 15
    end
    object QryExamesItensDigitaCampo: TStringField
      FieldName = 'DigitaCampo'
      Origin = 'DNLABVET.ExamesItensParam.DigitaCampo'
      FixedChar = True
      Size = 1
    end
    object QryExamesItensMinimo: TFloatField
      FieldName = 'Minimo'
      Origin = 'DNLABVET.ExamesItensParam.Minimo'
    end
    object QryExamesItensMaximo: TFloatField
      FieldName = 'Maximo'
      Origin = 'DNLABVET.ExamesItensParam.Maximo'
    end
    object QryExamesItensObrigatorio: TStringField
      FieldName = 'Obrigatorio'
      Origin = 'DNLABVET.ExamesItensParam.Obrigatorio'
      FixedChar = True
      Size = 1
    end
    object QryExamesItensTipoCampo: TStringField
      FieldName = 'TipoCampo'
      Origin = 'DNLABVET.ExamesItensParam.TipoCampo'
      FixedChar = True
      Size = 1
    end
    object QryExamesItensUnidade1: TStringField
      FieldName = 'Unidade1'
      Origin = 'DNLABVET.ExamesItensParam.Unidade1'
      FixedChar = True
      Size = 15
    end
    object QryExamesItensUnidade2: TStringField
      FieldName = 'Unidade2'
      Origin = 'DNLABVET.ExamesItensParam.Unidade2'
      FixedChar = True
      Size = 15
    end
    object QryExamesItensCasasDecimais1: TIntegerField
      FieldName = 'CasasDecimais1'
      Origin = 'DNLABVET.ExamesItensParam.CasasDecimais1'
    end
    object QryExamesItensCasasDecimais2: TIntegerField
      FieldName = 'CasasDecimais2'
      Origin = 'DNLABVET.ExamesItensParam.CasasDecimais2'
    end
    object QryExamesItensTipoCampo2: TStringField
      FieldName = 'TipoCampo2'
      Origin = 'DNLABVET.ExamesItensParam.TipoCampo2'
      FixedChar = True
      Size = 1
    end
  end
  object DSExamesItens: TDataSource
    AutoEdit = False
    DataSet = QryExamesItens
    Left = 661
    Top = 378
  end
  object QryMovItensExames: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select Mei.*'
      'From MovItensExames Mei '
      'Where '
      '(mei.CodMovExames = :CodMovExames)')
    UpdateObject = UPDMovExamesItens
    Left = 469
    Top = 269
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodMovExames'
        ParamType = ptInput
      end>
    object QryMovItensExamesCodMovItensExames: TAutoIncField
      FieldName = 'CodMovItensExames'
      Origin = 'DNLABVET.MovItensExames.CodMovItensExames'
    end
    object QryMovItensExamesCodMovExames: TIntegerField
      FieldName = 'CodMovExames'
      Origin = 'DNLABVET.MovItensExames.CodMovExames'
    end
    object QryMovItensExamesCodExame: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.MovItensExames.CodExame'
    end
    object QryMovItensExamesCodItensExame: TIntegerField
      FieldName = 'CodItensExame'
      Origin = 'DNLABVET.MovItensExames.CodItensExame'
    end
    object QryMovItensExamesResultado1: TFloatField
      FieldName = 'Resultado1'
      Origin = 'DNLABVET.MovItensExames.Resultado1'
    end
    object QryMovItensExamesResultado2: TFloatField
      FieldName = 'Resultado2'
      Origin = 'DNLABVET.MovItensExames.Resultado2'
    end
    object QryMovItensExamesResultadoTexto: TMemoField
      FieldName = 'ResultadoTexto'
      Origin = 'DNLABVET.MovItensExames.ResultadoTexto'
      BlobType = ftMemo
    end
    object QryMovItensExamesOrdemApresentacao: TIntegerField
      FieldName = 'OrdemApresentacao'
      Origin = 'DNLABVET.MovItensExames.OrdemApresentacao'
    end
    object QryMovItensExamesNomeItemExame: TStringField
      FieldName = 'NomeItemExame'
      Origin = 'DNLABVET.MovItensExames.NomeItemExame'
      FixedChar = True
      Size = 30
    end
    object QryMovItensExamesReferencia1: TStringField
      FieldName = 'Referencia1'
      Origin = 'DNLABVET.MovItensExames.Referencia1'
      FixedChar = True
      Size = 15
    end
    object QryMovItensExamesReferencia2: TStringField
      FieldName = 'Referencia2'
      Origin = 'DNLABVET.MovItensExames.Referencia2'
      FixedChar = True
      Size = 15
    end
    object QryMovItensExamesDigitaCampo: TStringField
      FieldName = 'DigitaCampo'
      Origin = 'DNLABVET.MovItensExames.DigitaCampo'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesMinimo: TFloatField
      FieldName = 'Minimo'
      Origin = 'DNLABVET.MovItensExames.Minimo'
    end
    object QryMovItensExamesMaximo: TFloatField
      FieldName = 'Maximo'
      Origin = 'DNLABVET.MovItensExames.Maximo'
    end
    object QryMovItensExamesObrigatorio: TStringField
      FieldName = 'Obrigatorio'
      Origin = 'DNLABVET.MovItensExames.Obrigatorio'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesTipoCampo: TStringField
      FieldName = 'TipoCampo'
      Origin = 'DNLABVET.MovItensExames.TipoCampo'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesUnidade1: TStringField
      FieldName = 'Unidade1'
      Origin = 'DNLABVET.MovItensExames.Unidade1'
      FixedChar = True
      Size = 15
    end
    object QryMovItensExamesUnidade2: TStringField
      FieldName = 'Unidade2'
      Origin = 'DNLABVET.MovItensExames.Unidade2'
      FixedChar = True
      Size = 15
    end
    object QryMovItensExamesCasasDecimais1: TIntegerField
      FieldName = 'CasasDecimais1'
      Origin = 'DNLABVET.MovItensExames.CasasDecimais1'
    end
    object QryMovItensExamesCasasDecimais2: TIntegerField
      FieldName = 'CasasDecimais2'
      Origin = 'DNLABVET.MovItensExames.CasasDecimais2'
    end
    object QryMovItensExamesTipoCampo2: TStringField
      FieldName = 'TipoCampo2'
      Origin = 'DNLABVET.MovItensExames.TipoCampo2'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesFormula: TStringField
      FieldName = 'Formula'
      Origin = 'DNLABVET.MovItensExames.Formula'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesOrigemCalculo: TStringField
      FieldName = 'OrigemCalculo'
      Origin = 'DNLABVET.MovItensExames.OrigemCalculo'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesCodPai: TIntegerField
      FieldName = 'CodPai'
      Origin = 'DNLABVET.MovItensExames.CodPai'
    end
    object QryMovItensExamesPercFormula: TFloatField
      FieldName = 'PercFormula'
      Origin = 'DNLABVET.MovItensExames.PercFormula'
    end
  end
  object DSMovItensExames: TDataSource
    AutoEdit = False
    DataSet = QryMovItensExames
    Left = 509
    Top = 269
  end
  object UPDMovExamesItens: TUpdateSQL
    ModifySQL.Strings = (
      'update MovItensExames'
      'set'
      '  CodMovExames = :CodMovExames,'
      '  CodExame = :CodExame,'
      '  CodItensExame = :CodItensExame,'
      '  Resultado1 = :Resultado1,'
      '  Resultado2 = :Resultado2,'
      '  ResultadoTexto = :ResultadoTexto,'
      '  OrdemApresentacao = :OrdemApresentacao,'
      '  NomeItemExame = :NomeItemExame,'
      '  Referencia1 = :Referencia1,'
      '  Referencia2 = :Referencia2,'
      '  Unidade1 = :Unidade1,'
      '  Unidade2 = :Unidade2,'
      '  DigitaCampo = :DigitaCampo,'
      '  Minimo = :Minimo,'
      '  Maximo = :Maximo,'
      '  Obrigatorio = :Obrigatorio,'
      '  TipoCampo = :TipoCampo,'
      '  CasasDecimais1 = :CasasDecimais1,'
      '  CasasDecimais2 = :CasasDecimais2,'
      '  TipoCampo2 = :TipoCampo2'
      'where'
      '  CodMovItensExames = :OLD_CodMovItensExames')
    InsertSQL.Strings = (
      'insert into MovItensExames'
      
        '  (CodMovExames, CodExame, CodItensExame, Resultado1, Resultado2' +
        ', ResultadoTexto, '
      
        '   OrdemApresentacao, NomeItemExame, Referencia1, Referencia2, U' +
        'nidade1, '
      
        '   Unidade2, DigitaCampo, Minimo, Maximo, Obrigatorio, TipoCampo' +
        ', CasasDecimais1, '
      '   CasasDecimais2, TipoCampo2)'
      'values'
      
        '  (:CodMovExames, :CodExame, :CodItensExame, :Resultado1, :Resul' +
        'tado2, '
      
        '   :ResultadoTexto, :OrdemApresentacao, :NomeItemExame, :Referen' +
        'cia1, :Referencia2, '
      
        '   :Unidade1, :Unidade2, :DigitaCampo, :Minimo, :Maximo, :Obriga' +
        'torio, '
      '   :TipoCampo, :CasasDecimais1, :CasasDecimais2, :TipoCampo2)')
    DeleteSQL.Strings = (
      'delete from MovItensExames'
      'where'
      '  CodMovItensExames = :OLD_CodMovItensExames')
    Left = 485
    Top = 301
  end
  object SPInsertMovExames: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_Insert_MovExames'
    Left = 445
    Top = 359
    ParamData = <
      item
        DataType = ftInteger
        Name = 'Result'
        ParamType = ptResult
      end
      item
        DataType = ftInteger
        Name = '@CodMovExames_1'
        ParamType = ptOutput
      end
      item
        DataType = ftInteger
        Name = '@CodMovPedido_2'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CodExame_3'
        ParamType = ptInput
      end
      item
        DataType = ftDateTime
        Name = '@DataProvResultado_4'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@Valor_5'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CodEspecie_6'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@NomeExame_7'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@NomeExameReduz_8'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@Dias_Elaboracao_Exame_9'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@ImprimirSeparado_10'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Metodo_11'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Material_12'
        ParamType = ptInput
      end>
  end
  object SPInsertMovItensExames: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_Insert_MovItensExames'
    Left = 496
    Top = 354
    ParamData = <
      item
        DataType = ftInteger
        Name = 'Result'
        ParamType = ptResult
      end
      item
        DataType = ftInteger
        Name = '@CodMovItensExames_1'
        ParamType = ptOutput
      end
      item
        DataType = ftInteger
        Name = '@CodMovExames_2'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CodExame_3'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CodItensExame_4'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@Resultado1_5'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@Resultado2_6'
        ParamType = ptInput
      end
      item
        DataType = ftMemo
        Name = '@ResultadoTexto_7'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@OrdemApresentacao_8'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@NomeItemExame_9'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Referencia1_10'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Referencia2_11'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Unidade1_12'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@DigitaCampo_13'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Obrigatorio_14'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@TipoCampo_15'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@Maximo_16'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@Minimo_17'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Unidade2_18'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CasasDecimais1_19'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = '@CasasDecimais2_20'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@TipoCampo2_21'
        ParamType = ptInput
      end>
  end
  object SPUpdMovExames: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_UPDATE_MOV_EXAMES'
    Left = 477
    Top = 399
    ParamData = <
      item
        DataType = ftInteger
        Name = 'Result'
        ParamType = ptResult
      end
      item
        DataType = ftInteger
        Name = '@CodMovExames_1'
        ParamType = ptInput
      end
      item
        DataType = ftMemo
        Name = '@Observacao_2'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Material_3'
        ParamType = ptInput
      end>
  end
end
