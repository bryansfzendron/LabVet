object FrmExamesParam: TFrmExamesParam
  Left = 35
  Top = 93
  Width = 992
  Height = 586
  Caption = 'Parametros Exames'
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
    Width = 976
    Height = 91
    Align = alTop
    TabOrder = 0
    object Label1: TLabel
      Left = 13
      Top = 62
      Width = 34
      Height = 16
      Caption = 'Nome'
    end
    object Label9: TLabel
      Left = 13
      Top = 22
      Width = 47
      Height = 16
      Caption = 'Especie'
    end
    object EdNome: TEdit
      Left = 80
      Top = 58
      Width = 353
      Height = 24
      CharCase = ecUpperCase
      TabOrder = 1
    end
    object BbtnPesquisar: TBitBtn
      Left = 560
      Top = 16
      Width = 105
      Height = 33
      Cursor = crHandPoint
      Caption = '&Pesquisar'
      TabOrder = 2
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
      Left = 82
      Top = 17
      Width = 351
      Height = 23
      DropDownCount = 8
      LookupField = 'CodEspecie'
      LookupDisplay = 'NomeEspecie'
      LookupSource = DSEspecie
      TabOrder = 0
    end
  end
  object Panel3: TPanel
    Left = 0
    Top = 91
    Width = 976
    Height = 456
    Align = alClient
    Caption = 'Panel3'
    TabOrder = 1
    object PageControl1: TPageControl
      Left = 1
      Top = 1
      Width = 974
      Height = 454
      ActivePage = TSManutencao
      Align = alClient
      TabOrder = 0
      object TSPesquisa: TTabSheet
        Caption = 'Pesquisa'
        object Panel2: TPanel
          Left = 861
          Top = 0
          Width = 105
          Height = 423
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
            Top = 234
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
          object bbtnTransfere: TBitBtn
            Left = 1
            Top = 162
            Width = 103
            Height = 71
            Cursor = crHandPoint
            Caption = '&Transfere Outra Esp'#233'cie'
            TabOrder = 5
            OnClick = bbtnTransfereClick
            Glyph.Data = {
              76010000424D7601000000000000760000002800000020000000100000000100
              04000000000000010000130B0000130B00001000000000000000000000000000
              800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00333333333303
              333333333333337FF3333333333333903333333333333377FF33333333333399
              03333FFFFFFFFF777FF3000000999999903377777777777777FF0FFFF0999999
              99037F3337777777777F0FFFF099999999907F3FF777777777770F00F0999999
              99037F773777777777730FFFF099999990337F3FF777777777330F00FFFFF099
              03337F773333377773330FFFFFFFF09033337F3FF3FFF77733330F00F0000003
              33337F773777777333330FFFF0FF033333337F3FF7F3733333330F08F0F03333
              33337F7737F7333333330FFFF003333333337FFFF77333333333000000333333
              3333777777333333333333333333333333333333333333333333}
            Layout = blGlyphTop
            NumGlyphs = 2
          end
        end
        object Panel5: TPanel
          Left = 0
          Top = 0
          Width = 861
          Height = 423
          Align = alClient
          TabOrder = 1
          object Panel6: TPanel
            Left = 1
            Top = 1
            Width = 859
            Height = 168
            Align = alTop
            Caption = 'Panel6'
            TabOrder = 0
            object DBGrid1: TDBGrid
              Left = 1
              Top = 1
              Width = 857
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
            end
          end
          object Panel7: TPanel
            Left = 1
            Top = 169
            Width = 859
            Height = 253
            Align = alClient
            Caption = 'Panel7'
            TabOrder = 1
            object Panel8: TPanel
              Left = 1
              Top = 1
              Width = 857
              Height = 32
              Align = alTop
              TabOrder = 0
              object Label7: TLabel
                Left = 16
                Top = 8
                Width = 169
                Height = 18
                Caption = '<<< Itens do Exame >>>'
                Font.Charset = ANSI_CHARSET
                Font.Color = clWindowText
                Font.Height = -16
                Font.Name = 'Arial'
                Font.Style = []
                ParentFont = False
              end
            end
            object Panel9: TPanel
              Left = 750
              Top = 33
              Width = 108
              Height = 219
              Align = alRight
              TabOrder = 1
              object BbtnIncluirItens: TBitBtn
                Left = 1
                Top = 2
                Width = 103
                Height = 40
                Cursor = crHandPoint
                Caption = '&Incluir Itens'
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
                Caption = '&Alterar Itens'
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
                Caption = '&Excluir Itens'
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
              Width = 749
              Height = 219
              Align = alClient
              TabOrder = 2
              object DBGrid2: TDBGrid
                Left = 1
                Top = 1
                Width = 747
                Height = 217
                Align = alClient
                Color = clInfoBk
                DataSource = DSExamesItens
                TabOrder = 0
                TitleFont.Charset = ANSI_CHARSET
                TitleFont.Color = clWindowText
                TitleFont.Height = -13
                TitleFont.Name = 'Arial'
                TitleFont.Style = []
              end
            end
          end
        end
      end
      object TSManutencao: TTabSheet
        Caption = 'Manuten'#231#227'o'
        ImageIndex = 1
        object Label2: TLabel
          Left = 16
          Top = 64
          Width = 79
          Height = 16
          Caption = 'Nome Exame'
          FocusControl = DBEdit1
        end
        object Label3: TLabel
          Left = 16
          Top = 111
          Width = 137
          Height = 16
          Caption = 'Nome Exame Reduzido'
          FocusControl = DBEdit2
        end
        object Label5: TLabel
          Left = 16
          Top = 17
          Width = 47
          Height = 16
          Caption = 'Esp'#233'cie'
        end
        object Label4: TLabel
          Left = 184
          Top = 111
          Width = 92
          Height = 16
          Caption = 'Valor do Exame'
          FocusControl = DBEdit2
        end
        object Label6: TLabel
          Left = 344
          Top = 111
          Width = 213
          Height = 16
          Caption = 'Dias para Processamento do Exame'
          FocusControl = DBEdit2
        end
        object Label8: TLabel
          Left = 16
          Top = 167
          Width = 106
          Height = 16
          Caption = 'M'#233'todo do Exame'
          FocusControl = DBEdit4
        end
        object Label10: TLabel
          Left = 344
          Top = 167
          Width = 46
          Height = 16
          Caption = 'Material'
          FocusControl = DBEdit5
        end
        object Panel4: TPanel
          Left = 859
          Top = 0
          Width = 107
          Height = 423
          Align = alRight
          TabOrder = 6
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
        object DBEdit1: TDBEdit
          Left = 16
          Top = 80
          Width = 529
          Height = 24
          CharCase = ecUpperCase
          DataField = 'NomeExame'
          DataSource = DSQualquer
          TabOrder = 0
        end
        object DBEdit2: TDBEdit
          Left = 16
          Top = 127
          Width = 113
          Height = 24
          CharCase = ecUpperCase
          DataField = 'NomeExameReduz'
          DataSource = DSQualquer
          TabOrder = 1
        end
        object RxDBLookupCombo3: TRxDBLookupCombo
          Left = 16
          Top = 32
          Width = 529
          Height = 23
          DropDownCount = 8
          DataField = 'CodEspecie'
          DataSource = DSQualquer
          Enabled = False
          LookupField = 'CodEspecie'
          LookupDisplay = 'NomeEspecie'
          LookupSource = DSEspecie
          TabOrder = 5
        end
        object RxDBCalcEdit1: TRxDBCalcEdit
          Left = 184
          Top = 128
          Width = 121
          Height = 21
          DataField = 'Valor'
          DataSource = DSQualquer
          DisplayFormat = ',0.00'
          NumGlyphs = 2
          TabOrder = 2
        end
        object DBEdit3: TDBEdit
          Left = 344
          Top = 127
          Width = 105
          Height = 24
          CharCase = ecUpperCase
          DataField = 'Dias_Elaboracao_Exame'
          DataSource = DSQualquer
          TabOrder = 3
        end
        object DBCheckBox1: TDBCheckBox
          Left = 312
          Top = 0
          Width = 233
          Height = 17
          Caption = 'Imprimir Exame em Folha Separada'
          DataField = 'ImprimirSeparado'
          DataSource = DSQualquer
          Font.Charset = ANSI_CHARSET
          Font.Color = clRed
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = []
          ParentFont = False
          TabOrder = 4
          ValueChecked = 'S'
          ValueUnchecked = 'N'
        end
        object DBEdit4: TDBEdit
          Left = 16
          Top = 183
          Width = 321
          Height = 24
          CharCase = ecUpperCase
          DataField = 'Metodo'
          DataSource = DSQualquer
          TabOrder = 7
        end
        object DBEdit5: TDBEdit
          Left = 344
          Top = 183
          Width = 137
          Height = 24
          CharCase = ecUpperCase
          DataField = 'Material'
          DataSource = DSQualquer
          TabOrder = 8
        end
      end
      object TSItens: TTabSheet
        Caption = 'Itens'
        ImageIndex = 2
        object Label11: TLabel
          Left = 16
          Top = 17
          Width = 41
          Height = 16
          Caption = 'Exame'
        end
        object Label12: TLabel
          Left = 141
          Top = 64
          Width = 126
          Height = 16
          Caption = 'Nome Item do Exame'
          FocusControl = DBEdit6
        end
        object Label13: TLabel
          Left = 16
          Top = 64
          Width = 110
          Height = 16
          Caption = 'Posi'#231#227'o no Exame'
          FocusControl = DBEdit6
        end
        object Label14: TLabel
          Left = 16
          Top = 120
          Width = 81
          Height = 16
          Caption = '1'#186' Refer'#234'ncia '
          FocusControl = DBEdit7
        end
        object Label15: TLabel
          Left = 224
          Top = 120
          Width = 58
          Height = 16
          Caption = 'Unidade 1'
          FocusControl = DBEdit8
        end
        object Label18: TLabel
          Left = 16
          Top = 212
          Width = 176
          Height = 16
          Caption = 'Tipo de Campo 1 <Resultado>'
          FocusControl = DBEdit8
        end
        object Label19: TLabel
          Left = 17
          Top = 37
          Width = 45
          Height = 16
          Caption = 'Label19'
        end
        object Label20: TLabel
          Left = 16
          Top = 166
          Width = 81
          Height = 16
          Caption = '2'#186' Refer'#234'ncia '
          FocusControl = DBEdit11
        end
        object Label21: TLabel
          Left = 224
          Top = 166
          Width = 58
          Height = 16
          Caption = 'Unidade 2'
          FocusControl = DBEdit12
        end
        object Label22: TLabel
          Left = 352
          Top = 314
          Width = 176
          Height = 16
          Caption = 'Tipo de Campo 2 <Resultado>'
          FocusControl = DBEdit8
          Visible = False
        end
        object Label23: TLabel
          Left = 352
          Top = 104
          Width = 308
          Height = 16
          Caption = 'Casas Decimais 1 (Exemplo 0 sem Casas Decimais)'
          FocusControl = DBEdit13
        end
        object Label24: TLabel
          Left = 352
          Top = 166
          Width = 106
          Height = 16
          Caption = 'Casas Decimais 2'
          FocusControl = DBEdit14
        end
        object Label25: TLabel
          Left = 352
          Top = 120
          Width = 307
          Height = 16
          Caption = '1 Exemplo ,0 - 2 exemplo ,00 (Utilizado qdo Numero)'
          FocusControl = DBEdit13
        end
        object Label28: TLabel
          Left = 208
          Top = 213
          Width = 47
          Height = 16
          Caption = 'F'#243'rmula'
          FocusControl = DBEdit8
        end
        object Label29: TLabel
          Left = 304
          Top = 213
          Width = 95
          Height = 16
          Caption = 'Base de C'#225'lculo'
          FocusControl = DBEdit8
          Visible = False
        end
        object Label30: TLabel
          Left = 416
          Top = 213
          Width = 277
          Height = 16
          Caption = 'Exame que Utilizaremos como Base de C'#225'lculo'
          FocusControl = DBEdit8
          Visible = False
        end
        object Label31: TLabel
          Left = 784
          Top = 211
          Width = 43
          Height = 16
          Caption = 'Perc %'
          FocusControl = DBEdit15
        end
        object Panel11: TPanel
          Left = 854
          Top = 0
          Width = 112
          Height = 423
          Align = alRight
          TabOrder = 13
          object BitBtn1: TBitBtn
            Left = 2
            Top = 2
            Width = 108
            Height = 40
            Cursor = crHandPoint
            Caption = '&Gravar Itens'
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
            Caption = '&Cancelar Itens'
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
        object DBEdit6: TDBEdit
          Left = 141
          Top = 80
          Width = 428
          Height = 24
          DataField = 'NomeItemExame'
          DataSource = DSExamesItens
          TabOrder = 1
        end
        object SpinEdit1: TSpinEdit
          Left = 16
          Top = 80
          Width = 73
          Height = 26
          MaxValue = 100
          MinValue = 1
          TabOrder = 0
          Value = 1
        end
        object DBEdit7: TDBEdit
          Left = 16
          Top = 136
          Width = 201
          Height = 24
          DataField = 'Referencia1'
          DataSource = DSExamesItens
          TabOrder = 2
        end
        object DBEdit8: TDBEdit
          Left = 224
          Top = 136
          Width = 121
          Height = 24
          DataField = 'Unidade1'
          DataSource = DSExamesItens
          TabOrder = 3
        end
        object GroupBox1: TGroupBox
          Left = 17
          Top = 296
          Width = 313
          Height = 129
          Caption = 'Verifica'#231#227'o'
          TabOrder = 9
          object Label16: TLabel
            Left = 24
            Top = 81
            Width = 42
            Height = 16
            Caption = 'M'#237'nimo'
            FocusControl = DBEdit9
          end
          object Label17: TLabel
            Left = 160
            Top = 81
            Width = 46
            Height = 16
            Caption = 'M'#225'ximo'
            FocusControl = DBEdit10
          end
          object DBEdit9: TDBEdit
            Left = 24
            Top = 97
            Width = 121
            Height = 24
            CharCase = ecUpperCase
            DataField = 'Minimo'
            DataSource = DSExamesItens
            TabOrder = 0
          end
          object DBEdit10: TDBEdit
            Left = 160
            Top = 97
            Width = 121
            Height = 24
            CharCase = ecUpperCase
            DataField = 'Maximo'
            DataSource = DSExamesItens
            TabOrder = 1
          end
          object Memo1: TMemo
            Left = 11
            Top = 17
            Width = 285
            Height = 57
            Enabled = False
            Lines.Strings = (
              'Verifica   se o Resultado est'#225' dentro do '
              'Parametro Abaixo <Campos N'#227'o Obrigat'#243'rio> '
              '- Somente para Campo N'#250'merico.')
            TabOrder = 2
          end
        end
        object DBCheckBox2: TDBCheckBox
          Left = 17
          Top = 267
          Width = 185
          Height = 17
          Caption = 'Digita Resultado'
          DataField = 'DigitaCampo'
          DataSource = DSExamesItens
          Font.Charset = ANSI_CHARSET
          Font.Color = clMaroon
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = []
          ParentFont = False
          TabOrder = 11
          ValueChecked = 'S'
          ValueUnchecked = 'N'
        end
        object DBCheckBox3: TDBCheckBox
          Left = 249
          Top = 267
          Width = 185
          Height = 17
          Caption = 'Campo Obrigat'#243'rio'
          DataField = 'Obrigatorio'
          DataSource = DSExamesItens
          Font.Charset = ANSI_CHARSET
          Font.Color = clMaroon
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = []
          ParentFont = False
          TabOrder = 12
          ValueChecked = 'S'
          ValueUnchecked = 'N'
        end
        object RxDBComboBox1: TRxDBComboBox
          Left = 18
          Top = 232
          Width = 145
          Height = 24
          DataField = 'TipoCampo'
          DataSource = DSExamesItens
          EnableValues = False
          ItemHeight = 16
          Items.Strings = (
            'N'#250'merico'
            'Texto'
            'Sem Informa'#231#227'o')
          TabOrder = 8
        end
        object DBEdit11: TDBEdit
          Left = 16
          Top = 182
          Width = 201
          Height = 24
          DataField = 'Referencia2'
          DataSource = DSExamesItens
          TabOrder = 5
        end
        object DBEdit12: TDBEdit
          Left = 224
          Top = 182
          Width = 121
          Height = 24
          DataField = 'Unidade2'
          DataSource = DSExamesItens
          TabOrder = 6
        end
        object RxDBComboBox2: TRxDBComboBox
          Left = 354
          Top = 334
          Width = 145
          Height = 24
          DataField = 'TipoCampo2'
          DataSource = DSExamesItens
          EnableValues = False
          ItemHeight = 16
          Items.Strings = (
            'N'#250'merico'
            'Texto'
            'Sem Informa'#231#227'o')
          TabOrder = 10
          Visible = False
        end
        object DBEdit13: TDBEdit
          Left = 352
          Top = 136
          Width = 121
          Height = 24
          DataField = 'CasasDecimais1'
          DataSource = DSExamesItens
          TabOrder = 4
        end
        object DBEdit14: TDBEdit
          Left = 352
          Top = 182
          Width = 121
          Height = 24
          DataField = 'CasasDecimais2'
          DataSource = DSExamesItens
          TabOrder = 7
        end
        object RxDBComboBox3: TRxDBComboBox
          Left = 210
          Top = 233
          Width = 79
          Height = 24
          DataField = 'Formula'
          DataSource = DSExamesItens
          EnableValues = False
          ItemHeight = 16
          Items.Strings = (
            'N'#227'o'
            'Sim')
          TabOrder = 14
          OnChange = RxDBComboBox3Change
        end
        object RxDBComboBox4: TRxDBComboBox
          Left = 304
          Top = 231
          Width = 97
          Height = 24
          DataField = 'OrigemCalculo'
          DataSource = DSExamesItens
          EnableValues = False
          ItemHeight = 16
          Items.Strings = (
            'N'#227'o'
            'Sim')
          TabOrder = 15
          Visible = False
          OnClick = RxDBComboBox4Click
        end
        object RxDBLookupCombo4: TRxDBLookupCombo
          Left = 416
          Top = 232
          Width = 361
          Height = 23
          DropDownCount = 8
          DataField = 'CodPai'
          DataSource = DSExamesItens
          LookupField = 'CodItensExame'
          LookupDisplay = 'NomeItemExame'
          LookupSource = DSOrigem
          TabOrder = 16
        end
        object DBEdit15: TDBEdit
          Left = 784
          Top = 230
          Width = 49
          Height = 24
          DataField = 'PercFormula'
          DataSource = DSExamesItens
          TabOrder = 17
        end
      end
      object TSTransfere: TTabSheet
        Caption = 'Transfer'#234'ncia Outra Esp'#233'cie'
        ImageIndex = 3
        object Panel12: TPanel
          Left = 854
          Top = 0
          Width = 112
          Height = 423
          Align = alRight
          TabOrder = 0
          object BitBtn2: TBitBtn
            Left = 2
            Top = 2
            Width = 108
            Height = 40
            Cursor = crHandPoint
            Caption = '&Transfere'
            TabOrder = 0
            OnClick = BitBtn2Click
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
          object BitBtn3: TBitBtn
            Left = 2
            Top = 42
            Width = 108
            Height = 40
            Cursor = crHandPoint
            Caption = '&Cancelar'
            TabOrder = 1
            OnClick = BitBtn3Click
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
        object Panel13: TPanel
          Left = 0
          Top = 0
          Width = 854
          Height = 423
          Align = alClient
          TabOrder = 1
          object Panel14: TPanel
            Left = 1
            Top = 1
            Width = 852
            Height = 112
            Align = alTop
            TabOrder = 0
            object Label26: TLabel
              Left = 14
              Top = 64
              Width = 375
              Height = 16
              Caption = 'Selecione as Para Qual Esp'#233'cie voc'#234' Deseja Transferir o Exame'
            end
            object Label27: TLabel
              Left = 13
              Top = 22
              Width = 41
              Height = 16
              Caption = 'Exame'
            end
            object RxDBLookupCombo1: TRxDBLookupCombo
              Left = 82
              Top = 17
              Width = 447
              Height = 23
              DropDownCount = 8
              LookupField = 'CodExame'
              LookupDisplay = 'NomeExame'
              LookupSource = DSQualquer
              TabOrder = 0
            end
            object CheckBox1: TCheckBox
              Left = 14
              Top = 88
              Width = 97
              Height = 17
              Caption = 'Todos'
              TabOrder = 1
              OnClick = CheckBox1Click
            end
          end
          object CheckListBox1: TCheckListBox
            Left = 1
            Top = 113
            Width = 852
            Height = 309
            Align = alClient
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -16
            Font.Name = 'Courier New'
            Font.Style = []
            ItemHeight = 18
            ParentFont = False
            TabOrder = 1
          end
        end
      end
    end
  end
  object QryQualquer: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select Ex.*, Esp.NomeEspecie as Especie'
      
        'From Exames Ex inner join Especie esp  on ex.codEspecie = esp.co' +
        'despecie'
      'Where Ex.NomeExame Like :Nome'
      'and'
      '(Ex.CodEspecie = :CodEspecie)'
      'Order by Ex.NomeExame')
    UpdateObject = UDPQualquer
    Left = 733
    Top = 125
    ParamData = <
      item
        DataType = ftString
        Name = 'Nome'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'CodEspecie'
        ParamType = ptInput
      end>
    object QryQualquerEspecie: TStringField
      FieldName = 'Especie'
      Origin = 'DNLABVET.Especie.NomeEspecie'
      FixedChar = True
    end
    object QryQualquerNomeExame: TStringField
      FieldName = 'NomeExame'
      Origin = 'DNLABVET.Exames.NomeExame'
      FixedChar = True
      Size = 50
    end
    object QryQualquerMaterial: TStringField
      FieldName = 'Material'
      Origin = 'DNLABVET.Exames.Material'
      FixedChar = True
      Size = 10
    end
    object QryQualquerNomeExameReduz: TStringField
      FieldName = 'NomeExameReduz'
      Origin = 'DNLABVET.Exames.NomeExameReduz'
      FixedChar = True
      Size = 10
    end
    object QryQualquerValor: TFloatField
      FieldName = 'Valor'
      Origin = 'DNLABVET.Exames.Valor'
    end
    object QryQualquerDias_Elaboracao_Exame: TIntegerField
      FieldName = 'Dias_Elaboracao_Exame'
      Origin = 'DNLABVET.Exames.Dias_Elaboracao_Exame'
    end
    object QryQualquerImprimirSeparado: TStringField
      FieldName = 'ImprimirSeparado'
      Origin = 'DNLABVET.Exames.ImprimirSeparado'
      FixedChar = True
      Size = 1
    end
    object QryQualquerCodExame: TAutoIncField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.Exames.CodExame'
    end
    object QryQualquerCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.Exames.CodEspecie'
    end
    object QryQualquerMetodo: TStringField
      FieldName = 'Metodo'
      Origin = 'DNLABVET.Exames.Metodo'
      FixedChar = True
    end
  end
  object UDPQualquer: TUpdateSQL
    ModifySQL.Strings = (
      'update Exames'
      'set'
      '  CodEspecie = :CodEspecie,'
      '  NomeExame = :NomeExame,'
      '  NomeExameReduz = :NomeExameReduz,'
      '  Valor = :Valor,'
      '  Dias_Elaboracao_Exame = :Dias_Elaboracao_Exame,'
      '  ImprimirSeparado = :ImprimirSeparado,'
      '  Metodo = :Metodo,'
      '  Material = :Material'
      'where'
      '  CodExame = :OLD_CodExame')
    InsertSQL.Strings = (
      'insert into Exames'
      
        '  (CodEspecie, NomeExame, NomeExameReduz, Valor, Dias_Elaboracao' +
        '_Exame, '
      '   ImprimirSeparado, Metodo, Material)'
      'values'
      
        '  (:CodEspecie, :NomeExame, :NomeExameReduz, :Valor, :Dias_Elabo' +
        'racao_Exame, '
      '   :ImprimirSeparado, :Metodo, :Material)')
    DeleteSQL.Strings = (
      'delete from Exames'
      'where'
      '  CodExame = :OLD_CodExame')
    Left = 741
    Top = 165
  end
  object DSQualquer: TDataSource
    AutoEdit = False
    DataSet = QryQualquer
    OnDataChange = DSQualquerDataChange
    Left = 773
    Top = 125
  end
  object QryCliente: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Especie'
      'Order by NomeEspecie')
    Left = 629
    Top = 146
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
  end
  object DSCliente: TDataSource
    AutoEdit = False
    DataSet = QryCliente
    Left = 669
    Top = 146
  end
  object QryEspecie: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Especie'
      'Order by NomeEspecie')
    Left = 349
    Top = 290
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
  object DSEspecie: TDataSource
    AutoEdit = False
    DataSet = QryEspecie
    Left = 389
    Top = 290
  end
  object QryExamesItens: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select Ex.*'
      'From ExamesItensParam Ex '
      'Where '
      '(Ex.CodExame = :CodExame)'
      'Order by Ex.OrdemApresentacao')
    UpdateObject = UPDItens
    Left = 509
    Top = 373
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodExame'
        ParamType = ptInput
      end>
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
    object QryExamesItensCodItensExame: TAutoIncField
      FieldName = 'CodItensExame'
      Origin = 'DNLABVET.ExamesItensParam.CodItensExame'
    end
    object QryExamesItensCodExame: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.ExamesItensParam.CodExame'
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
    object QryExamesItensFormula: TStringField
      FieldName = 'Formula'
      Origin = 'DNLABVET.ExamesItensParam.Formula'
      FixedChar = True
      Size = 1
    end
    object QryExamesItensOrigemCalculo: TStringField
      FieldName = 'OrigemCalculo'
      Origin = 'DNLABVET.ExamesItensParam.OrigemCalculo'
      FixedChar = True
      Size = 1
    end
    object QryExamesItensCodPai: TIntegerField
      FieldName = 'CodPai'
      Origin = 'DNLABVET.ExamesItensParam.CodPai'
    end
    object QryExamesItensPercFormula: TFloatField
      FieldName = 'PercFormula'
      Origin = 'DNLABVET.ExamesItensParam.PercFormula'
    end
  end
  object DSExamesItens: TDataSource
    AutoEdit = False
    DataSet = QryExamesItens
    Left = 573
    Top = 373
  end
  object UPDItens: TUpdateSQL
    ModifySQL.Strings = (
      'update ExamesItensParam'
      'set'
      '  CodExame = :CodExame,'
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
      '  TipoCampo2 = :TipoCampo2,'
      '  Formula = :Formula,'
      '  OrigemCalculo = :OrigemCalculo,'
      '  CodPai = :CodPai,'
      '  PercFormula = :PercFormula'
      'where'
      '  CodItensExame = :OLD_CodItensExame')
    InsertSQL.Strings = (
      'insert into ExamesItensParam'
      
        '  (CodExame, OrdemApresentacao, NomeItemExame, Referencia1, Refe' +
        'rencia2, '
      
        '   Unidade1, Unidade2, DigitaCampo, Minimo, Maximo, Obrigatorio,' +
        ' TipoCampo, '
      
        '   CasasDecimais1, CasasDecimais2, TipoCampo2, Formula, OrigemCa' +
        'lculo, '
      '   CodPai, PercFormula)'
      'values'
      
        '  (:CodExame, :OrdemApresentacao, :NomeItemExame, :Referencia1, ' +
        ':Referencia2, '
      
        '   :Unidade1, :Unidade2, :DigitaCampo, :Minimo, :Maximo, :Obriga' +
        'torio, '
      
        '   :TipoCampo, :CasasDecimais1, :CasasDecimais2, :TipoCampo2, :F' +
        'ormula, '
      '   :OrigemCalculo, :CodPai, :PercFormula)')
    DeleteSQL.Strings = (
      'delete from ExamesItensParam'
      'where'
      '  CodItensExame = :OLD_CodItensExame')
    Left = 541
    Top = 413
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
    Left = 669
    Top = 357
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
      Size = 30
    end
    object QryExameItensSeqReferencia1: TStringField
      FieldName = 'Referencia1'
      Origin = 'DNLABVET.ExamesItensParam.Referencia1'
      FixedChar = True
      Size = 15
    end
    object QryExameItensSeqReferencia2: TStringField
      FieldName = 'Referencia2'
      Origin = 'DNLABVET.ExamesItensParam.Referencia2'
      FixedChar = True
      Size = 15
    end
    object QryExameItensSeqUnidade1: TStringField
      FieldName = 'Unidade1'
      Origin = 'DNLABVET.ExamesItensParam.Unidade1'
      FixedChar = True
      Size = 15
    end
    object QryExameItensSeqUnidade2: TStringField
      FieldName = 'Unidade2'
      Origin = 'DNLABVET.ExamesItensParam.Unidade2'
      FixedChar = True
      Size = 15
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
  object SPINSExame: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_Insert_Exames'
    Left = 891
    Top = 239
    ParamData = <
      item
        DataType = ftInteger
        Name = 'Result'
        ParamType = ptResult
      end
      item
        DataType = ftInteger
        Name = '@CodExame_3'
        ParamType = ptOutput
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
  object SPINSItens: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_Insert_ExamesItensPAram'
    Left = 891
    Top = 319
    ParamData = <
      item
        DataType = ftInteger
        Name = 'Result'
        ParamType = ptResult
      end
      item
        DataType = ftInteger
        Name = '@CodExame_3'
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
  object QryOrigem: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select Ex.*'
      'From ExamesItensParam Ex '
      'Where '
      '(Ex.CodExame = :CodExame)'
      'and '
      '(Ex.OrigemCalculo = '#39'S'#39')'
      'Order by Ex.OrdemApresentacao')
    Left = 717
    Top = 408
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodExame'
        ParamType = ptInput
      end>
    object IntegerField1: TIntegerField
      FieldName = 'OrdemApresentacao'
      Origin = 'DNLABVET.ExamesItensParam.OrdemApresentacao'
    end
    object StringField1: TStringField
      FieldName = 'NomeItemExame'
      Origin = 'DNLABVET.ExamesItensParam.NomeItemExame'
      FixedChar = True
      Size = 30
    end
    object StringField2: TStringField
      FieldName = 'Referencia1'
      Origin = 'DNLABVET.ExamesItensParam.Referencia1'
      FixedChar = True
      Size = 15
    end
    object StringField3: TStringField
      FieldName = 'Referencia2'
      Origin = 'DNLABVET.ExamesItensParam.Referencia2'
      FixedChar = True
      Size = 15
    end
    object StringField4: TStringField
      FieldName = 'DigitaCampo'
      Origin = 'DNLABVET.ExamesItensParam.DigitaCampo'
      FixedChar = True
      Size = 1
    end
    object FloatField1: TFloatField
      FieldName = 'Minimo'
      Origin = 'DNLABVET.ExamesItensParam.Minimo'
    end
    object FloatField2: TFloatField
      FieldName = 'Maximo'
      Origin = 'DNLABVET.ExamesItensParam.Maximo'
    end
    object StringField5: TStringField
      FieldName = 'Obrigatorio'
      Origin = 'DNLABVET.ExamesItensParam.Obrigatorio'
      FixedChar = True
      Size = 1
    end
    object StringField6: TStringField
      FieldName = 'TipoCampo'
      Origin = 'DNLABVET.ExamesItensParam.TipoCampo'
      FixedChar = True
      Size = 1
    end
    object AutoIncField1: TAutoIncField
      FieldName = 'CodItensExame'
      Origin = 'DNLABVET.ExamesItensParam.CodItensExame'
    end
    object IntegerField2: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.ExamesItensParam.CodExame'
    end
    object StringField7: TStringField
      FieldName = 'Unidade1'
      Origin = 'DNLABVET.ExamesItensParam.Unidade1'
      FixedChar = True
      Size = 15
    end
    object StringField8: TStringField
      FieldName = 'Unidade2'
      Origin = 'DNLABVET.ExamesItensParam.Unidade2'
      FixedChar = True
      Size = 15
    end
    object IntegerField3: TIntegerField
      FieldName = 'CasasDecimais1'
      Origin = 'DNLABVET.ExamesItensParam.CasasDecimais1'
    end
    object IntegerField4: TIntegerField
      FieldName = 'CasasDecimais2'
      Origin = 'DNLABVET.ExamesItensParam.CasasDecimais2'
    end
    object StringField9: TStringField
      FieldName = 'TipoCampo2'
      Origin = 'DNLABVET.ExamesItensParam.TipoCampo2'
      FixedChar = True
      Size = 1
    end
    object StringField10: TStringField
      FieldName = 'Formula'
      Origin = 'DNLABVET.ExamesItensParam.Formula'
      FixedChar = True
      Size = 1
    end
    object StringField11: TStringField
      FieldName = 'OrigemCalculo'
      Origin = 'DNLABVET.ExamesItensParam.OrigemCalculo'
      FixedChar = True
      Size = 1
    end
    object IntegerField5: TIntegerField
      FieldName = 'CodPai'
      Origin = 'DNLABVET.ExamesItensParam.CodPai'
    end
    object FloatField3: TFloatField
      FieldName = 'PercFormula'
      Origin = 'DNLABVET.ExamesItensParam.PercFormula'
    end
  end
  object DSOrigem: TDataSource
    AutoEdit = False
    DataSet = QryOrigem
    Left = 749
    Top = 405
  end
end
