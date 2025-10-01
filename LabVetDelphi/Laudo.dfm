object FrmLaudo: TFrmLaudo
  Left = 293
  Top = 21
  Width = 987
  Height = 714
  Caption = 'Montagem do Laudo'
  Color = clBtnFace
  Constraints.MaxHeight = 714
  Constraints.MaxWidth = 987
  Constraints.MinHeight = 714
  Constraints.MinWidth = 987
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  Position = poDesktopCenter
  OnActivate = FormActivate
  OnClose = FormClose
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 971
    Height = 192
    Align = alTop
    TabOrder = 0
    object Label9: TLabel
      Left = 13
      Top = 14
      Width = 86
      Height = 13
      Caption = 'Cl'#237'nica Veterin'#225'ria'
    end
    object Label29: TLabel
      Left = 13
      Top = 44
      Width = 38
      Height = 13
      Caption = 'Esp'#233'cie'
    end
    object Label21: TLabel
      Left = 14
      Top = 108
      Width = 62
      Height = 13
      Caption = 'Nome Animal'
    end
    object Label1: TLabel
      Left = 318
      Top = 109
      Width = 53
      Height = 13
      Caption = 'Proprietario'
    end
    object Label26: TLabel
      Left = 14
      Top = 131
      Width = 24
      Height = 13
      Caption = 'Sexo'
    end
    object Label30: TLabel
      Left = 14
      Top = 155
      Width = 27
      Height = 13
      Caption = 'Idade'
    end
    object Label28: TLabel
      Left = 15
      Top = 173
      Width = 165
      Height = 13
      Caption = 'N'#250'mero de Controle do Laborat'#243'rio'
      FocusControl = DBEdit6
    end
    object Label20: TLabel
      Left = 606
      Top = 14
      Width = 45
      Height = 13
      Caption = 'Protocolo'
    end
    object Label27: TLabel
      Left = 610
      Top = 40
      Width = 33
      Height = 13
      Caption = 'Pedido'
    end
    object Label37: TLabel
      Left = 13
      Top = 73
      Width = 235
      Height = 13
      Caption = 'Exame Solicitado (Obrigat'#243'rio Selecionar Esp'#233'cie)'
    end
    object BbtnPesquisar: TBitBtn
      Left = 848
      Top = 48
      Width = 129
      Height = 33
      Cursor = crHandPoint
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
    object BbtnLimpa: TBitBtn
      Left = 848
      Top = 8
      Width = 129
      Height = 33
      Cursor = crHandPoint
      Caption = 'Limpa &Campos'
      TabOrder = 1
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
    object RxDBLookupCombo2: TRxDBLookupCombo
      Left = 121
      Top = 9
      Width = 448
      Height = 23
      DropDownCount = 8
      LookupField = 'CodCliente'
      LookupDisplay = 'Nome'
      LookupSource = DSCliente
      TabOrder = 2
    end
    object RxDBLookupCombo1: TRxDBLookupCombo
      Left = 121
      Top = 39
      Width = 448
      Height = 23
      DropDownCount = 8
      LookupField = 'CodEspecie'
      LookupDisplay = 'NomeEspecie'
      LookupSource = DSEspecie
      TabOrder = 3
      OnChange = RxDBLookupCombo1Change
    end
    object Edit2: TEdit
      Left = 120
      Top = 103
      Width = 193
      Height = 21
      TabOrder = 5
    end
    object Edit3: TEdit
      Left = 392
      Top = 102
      Width = 193
      Height = 21
      TabOrder = 6
    end
    object EdCodPedido: TRxCalcEdit
      Left = 221
      Top = 168
      Width = 99
      Height = 21
      AutoSize = False
      NumGlyphs = 2
      TabOrder = 7
    end
    object Edit5: TEdit
      Left = 120
      Top = 150
      Width = 73
      Height = 21
      TabOrder = 8
    end
    object Edit4: TEdit
      Left = 120
      Top = 126
      Width = 73
      Height = 21
      TabOrder = 9
    end
    object GroupBox2: TGroupBox
      Left = 329
      Top = 130
      Width = 231
      Height = 58
      Caption = 'Periodo'
      TabOrder = 10
      object Label22: TLabel
        Left = 16
        Top = 18
        Width = 27
        Height = 13
        Caption = 'Inicial'
      end
      object Label23: TLabel
        Left = 120
        Top = 18
        Width = 22
        Height = 13
        Caption = 'Final'
      end
      object Dti: TDateEdit
        Left = 8
        Top = 32
        Width = 97
        Height = 21
        NumGlyphs = 2
        TabOrder = 0
      end
      object Dtf: TDateEdit
        Left = 120
        Top = 32
        Width = 97
        Height = 21
        NumGlyphs = 2
        TabOrder = 1
      end
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
      TabOrder = 11
    end
    object EdPedido: TRxCalcEdit
      Left = 672
      Top = 38
      Width = 153
      Height = 21
      AutoSize = False
      NumGlyphs = 2
      TabOrder = 12
    end
    object EdProtocolo: TEdit
      Left = 672
      Top = 13
      Width = 153
      Height = 21
      TabOrder = 13
    end
    object RxDBLookupCombo4: TRxDBLookupCombo
      Left = 258
      Top = 68
      Width = 448
      Height = 23
      DropDownCount = 8
      LookupField = 'CodExame'
      LookupDisplay = 'NomeExame'
      LookupSource = DSExamesPedido
      TabOrder = 4
    end
  end
  object Panel3: TPanel
    Left = 0
    Top = 192
    Width = 971
    Height = 483
    Align = alClient
    TabOrder = 1
    object PageControl1: TPageControl
      Left = 1
      Top = 1
      Width = 969
      Height = 481
      ActivePage = TSItens
      Align = alClient
      TabOrder = 0
      object TSPesquisa: TTabSheet
        Caption = 'Pesquisa'
        object Panel2: TPanel
          Left = 856
          Top = 0
          Width = 105
          Height = 453
          Align = alRight
          TabOrder = 0
          object BbtnImprimir: TBitBtn
            Left = 1
            Top = 169
            Width = 103
            Height = 60
            Cursor = crHandPoint
            Caption = 'Imprimi&r'
            Enabled = False
            TabOrder = 0
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
            Layout = blGlyphTop
            NumGlyphs = 2
          end
          object BBtnFechat: TBitBtn
            Left = 1
            Top = 229
            Width = 103
            Height = 63
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
          object GroupBox1: TGroupBox
            Left = 0
            Top = 2
            Width = 105
            Height = 55
            Caption = 'Status'
            Font.Charset = DEFAULT_CHARSET
            Font.Color = clBlue
            Font.Height = -11
            Font.Name = 'MS Sans Serif'
            Font.Style = []
            ParentFont = False
            TabOrder = 2
            object Label18: TLabel
              Left = 2
              Top = 15
              Width = 101
              Height = 13
              Align = alTop
              Alignment = taCenter
              AutoSize = False
              Caption = 'Resp. Informado'
              Color = 16769695
              Font.Charset = DEFAULT_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'MS Sans Serif'
              Font.Style = []
              ParentColor = False
              ParentFont = False
            end
            object Label31: TLabel
              Left = 2
              Top = 28
              Width = 101
              Height = 13
              Align = alTop
              Alignment = taCenter
              AutoSize = False
              Caption = 'Aguardando Resp'
              Color = clInfoBk
              Font.Charset = DEFAULT_CHARSET
              Font.Color = clWindowText
              Font.Height = -11
              Font.Name = 'MS Sans Serif'
              Font.Style = []
              ParentColor = False
              ParentFont = False
            end
          end
        end
        object Panel5: TPanel
          Left = 0
          Top = 0
          Width = 856
          Height = 453
          Align = alClient
          TabOrder = 1
          object Panel6: TPanel
            Left = 1
            Top = 1
            Width = 854
            Height = 117
            Align = alTop
            Caption = 'Panel6'
            TabOrder = 0
            object DBGrid1: TDBGrid
              Left = 1
              Top = 1
              Width = 852
              Height = 115
              Align = alClient
              Color = clInfoBk
              DataSource = DSQualquer
              TabOrder = 0
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
                  FieldName = 'CodMovPedido'
                  Title.Caption = 'Pedido'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Retirar'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Cliente'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Proprietario'
                  Title.Caption = 'Dono Animal'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'NomeAnimal'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'nomeespecie'
                  Title.Caption = 'Especie'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'SexoAnimal'
                  Title.Caption = 'Sexo'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Raca'
                  Title.Caption = 'Ra'#231'a'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Contato'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'DataPedido'
                  Title.Caption = 'Pedido'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'HoraPedido'
                  Title.Caption = 'Hora Pedido'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'CodigoInterno'
                  Title.Caption = 'Protocolo'
                  Visible = True
                end
                item
                  Expanded = False
                  FieldName = 'Senha'
                  Visible = True
                end>
            end
          end
          object Panel7: TPanel
            Left = 1
            Top = 118
            Width = 854
            Height = 334
            Align = alClient
            Caption = 'Panel7'
            TabOrder = 1
            object Panel8: TPanel
              Left = 1
              Top = 1
              Width = 852
              Height = 32
              Align = alTop
              TabOrder = 0
              object Label7: TLabel
                Left = 336
                Top = 8
                Width = 150
                Height = 22
                Caption = '<<< Exames >>>'
                Font.Charset = ANSI_CHARSET
                Font.Color = clWindowText
                Font.Height = -19
                Font.Name = 'Arial'
                Font.Style = [fsBold]
                ParentFont = False
              end
            end
            object Panel10: TPanel
              Left = 1
              Top = 33
              Width = 852
              Height = 300
              Align = alClient
              TabOrder = 1
              object Panel13: TPanel
                Left = 1
                Top = 1
                Width = 850
                Height = 298
                Align = alClient
                Caption = 'Panel13'
                TabOrder = 0
                object Panel4: TPanel
                  Left = 1
                  Top = 1
                  Width = 848
                  Height = 154
                  Align = alTop
                  Caption = 'Panel4'
                  TabOrder = 0
                  object Panel15: TPanel
                    Left = 739
                    Top = 1
                    Width = 108
                    Height = 152
                    Align = alRight
                    TabOrder = 0
                    object BbtnExcluirItens: TBitBtn
                      Left = 2
                      Top = 3
                      Width = 104
                      Height = 53
                      Cursor = crHandPoint
                      Caption = '&Liberar Exame'
                      Enabled = False
                      Font.Charset = ANSI_CHARSET
                      Font.Color = clWindowText
                      Font.Height = -11
                      Font.Name = 'Arial'
                      Font.Style = []
                      ParentFont = False
                      TabOrder = 0
                      OnClick = BbtnExcluirItensClick
                      Glyph.Data = {
                        76020000424D7602000000000000760000002800000020000000200000000100
                        0400000000000002000000000000000000001000000000000000000000000000
                        8000008000000080800080000000800080008080000080808000C0C0C0000000
                        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00DD7777777777
                        777777777777DDDDDDDDDD7777777777777777777777DDDDDDDD000000000000
                        000000000077DDDDDDDD7FFFFFFFFFFFFFFFFFFFF077DDDDDDDD7FF7777777FF
                        FFFFFFFFF077DDDDDDDD7F99999997FFFFFFFFFFF077DDDDDDDD7F9FFFFF97FF
                        FFFFFFFFF077DDDDDDDD7F9FFFFF97FFFFFFFFFFF077DDDDDDDD7F9FFFFF97FF
                        FFFFFFFFF077DDDDDDDD7F9FFFFF97FFFF000FFFF077DDDDDDDD7F9FFFFF97FF
                        FF00003FF0777DDDDDDD7F9999999FFFFF0003B3B07777DDDDDD7FFFFFFFFFFF
                        FFF03B3B3B37777DDDDD7FF7707777FFFFF0B3B3B3BC7777DDDD7F99900997FF
                        FFFB3B3B3BCCC7777DDD7F9F000F97FFFFFFB3B3B3ECCC7777DD7F9F000097FF
                        FFFF3B3BCCCECCC7777D7F90000007FFFFFFF3BECCCCECCC77777F900FF000FF
                        FFFFFBCCECCCCECCC7777F900FFF00FFFFFFFCCCCECCCCECCC777F999999000F
                        FFFFFFCCCCECCCCECCC77FFFFFFFF000FFFFFFFCCCCECCCCECCC7FF777777000
                        0FFFFFFFCCCCECCCCECC7F999999970000FFFFFFFCCCCECCCCEC7F9FFFFF97F0
                        000FFFFFF0CCCCECCCCE7F9FFFFF97FFFFFFFFFFF07CCCCECCCC7F9FFFFF97FF
                        FFFFFFFFF077CCCCECCC7F9FFFFF97FFFFFFFFFFF077DCCCCECC7F9FFFFF97FF
                        FFFFFFFFF077DDCCCCEC7F9999999FFFFFFFFFFFF077DDDCCCCE7FFFFFFFFFFF
                        FFFFFFFFF0DDDDDDCCCC7777777777777777777770DDDDDDDCCC}
                      Layout = blGlyphTop
                    end
                    object GroupBox3: TGroupBox
                      Left = 7
                      Top = 95
                      Width = 96
                      Height = 55
                      Caption = 'Status'
                      Font.Charset = DEFAULT_CHARSET
                      Font.Color = clBlue
                      Font.Height = -11
                      Font.Name = 'MS Sans Serif'
                      Font.Style = []
                      ParentFont = False
                      TabOrder = 1
                      object Label12: TLabel
                        Left = 2
                        Top = 15
                        Width = 92
                        Height = 12
                        Align = alTop
                        Alignment = taCenter
                        AutoSize = False
                        Caption = 'Liberado'
                        Color = 16769695
                        Font.Charset = DEFAULT_CHARSET
                        Font.Color = clWindowText
                        Font.Height = -11
                        Font.Name = 'MS Sans Serif'
                        Font.Style = [fsBold]
                        ParentColor = False
                        ParentFont = False
                      end
                      object Label13: TLabel
                        Left = 2
                        Top = 39
                        Width = 92
                        Height = 12
                        Align = alTop
                        Alignment = taCenter
                        AutoSize = False
                        Caption = 'Atrasado'
                        Color = clRed
                        Font.Charset = DEFAULT_CHARSET
                        Font.Color = clWindowText
                        Font.Height = -11
                        Font.Name = 'MS Sans Serif'
                        Font.Style = [fsBold]
                        ParentColor = False
                        ParentFont = False
                      end
                      object Label14: TLabel
                        Left = 2
                        Top = 27
                        Width = 92
                        Height = 12
                        Align = alTop
                        Alignment = taCenter
                        AutoSize = False
                        Caption = 'Pendente'
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
                    object BbtnCancelaLib: TBitBtn
                      Left = 3
                      Top = 56
                      Width = 104
                      Height = 41
                      Cursor = crHandPoint
                      Caption = '&Cancela Libera'#231#227'o'
                      Enabled = False
                      Font.Charset = ANSI_CHARSET
                      Font.Color = clWindowText
                      Font.Height = -11
                      Font.Name = 'Arial'
                      Font.Style = []
                      ParentFont = False
                      TabOrder = 2
                      OnClick = BbtnCancelaLibClick
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
                    end
                  end
                  object Panel16: TPanel
                    Left = 1
                    Top = 1
                    Width = 738
                    Height = 152
                    Align = alClient
                    Caption = 'Panel16'
                    TabOrder = 1
                    object PageControl3: TPageControl
                      Left = 1
                      Top = 1
                      Width = 736
                      Height = 150
                      ActivePage = TabSheet3
                      Align = alClient
                      TabOrder = 0
                      object TabSheet3: TTabSheet
                        Caption = 'TabSheet3'
                        object DBGrid2: TDBGrid
                          Left = 0
                          Top = 0
                          Width = 728
                          Height = 122
                          Align = alClient
                          Color = clInfoBk
                          DataSource = DSMovExames
                          TabOrder = 0
                          TitleFont.Charset = DEFAULT_CHARSET
                          TitleFont.Color = clWindowText
                          TitleFont.Height = -11
                          TitleFont.Name = 'MS Sans Serif'
                          TitleFont.Style = []
                          OnCellClick = DBGrid2CellClick
                          OnDrawColumnCell = DBGrid2DrawColumnCell
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
                              FieldName = 'Material'
                              Visible = True
                            end>
                        end
                      end
                      object TabSheet4: TTabSheet
                        Caption = 'TabSheet4'
                        ImageIndex = 1
                        object GroupBox4: TGroupBox
                          Left = 0
                          Top = 0
                          Width = 728
                          Height = 122
                          Align = alClient
                          TabOrder = 0
                          object CheckBox3: TCheckBox
                            Left = 8
                            Top = 0
                            Width = 97
                            Height = 13
                            Caption = 'Todos'
                            TabOrder = 0
                            OnClick = CheckBox3Click
                          end
                          object Panel18: TPanel
                            Left = 2
                            Top = 15
                            Width = 724
                            Height = 18
                            Align = alTop
                            TabOrder = 1
                            object Label34: TLabel
                              Left = 8
                              Top = 3
                              Width = 33
                              Height = 13
                              Caption = 'C'#243'digo'
                            end
                            object Label35: TLabel
                              Left = 99
                              Top = 3
                              Width = 32
                              Height = 13
                              Caption = 'Exame'
                            end
                            object Label36: TLabel
                              Left = 387
                              Top = 3
                              Width = 41
                              Height = 13
                              Caption = 'Liberado'
                            end
                          end
                          object CheckListBox1: TCheckListBox
                            Left = 2
                            Top = 33
                            Width = 724
                            Height = 87
                            Align = alClient
                            Color = clInfoBk
                            Font.Charset = ANSI_CHARSET
                            Font.Color = clWindowText
                            Font.Height = -12
                            Font.Name = 'Courier New'
                            Font.Style = []
                            HeaderBackgroundColor = clWhite
                            ItemHeight = 15
                            ParentFont = False
                            TabOrder = 2
                          end
                        end
                      end
                    end
                  end
                end
                object Panel9: TPanel
                  Left = 741
                  Top = 155
                  Width = 108
                  Height = 142
                  Align = alRight
                  TabOrder = 1
                  object BbtnIncluirItens: TBitBtn
                    Left = 1
                    Top = 18
                    Width = 106
                    Height = 55
                    Cursor = crHandPoint
                    Caption = '&Incluir Laudo Exame'
                    Enabled = False
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
                    Layout = blGlyphTop
                    NumGlyphs = 2
                  end
                end
                object Panel12: TPanel
                  Left = 1
                  Top = 155
                  Width = 740
                  Height = 142
                  Align = alClient
                  Caption = 'Disponivel Apenas na Impress'#227'o do Relat'#243'rio'
                  TabOrder = 2
                  object Panel14: TPanel
                    Left = 1
                    Top = 1
                    Width = 738
                    Height = 32
                    Align = alTop
                    Caption = 'Itens do Exame < Lan'#231'a Laudo / Resultado >'
                    Font.Charset = ANSI_CHARSET
                    Font.Color = clRed
                    Font.Height = -19
                    Font.Name = 'Arial'
                    Font.Style = [fsBold]
                    ParentFont = False
                    TabOrder = 0
                  end
                  object DBGrid3: TDBGrid
                    Left = 1
                    Top = 33
                    Width = 738
                    Height = 108
                    Align = alClient
                    Color = clInfoBk
                    DataSource = DSMovItensExames
                    TabOrder = 1
                    TitleFont.Charset = DEFAULT_CHARSET
                    TitleFont.Color = clWindowText
                    TitleFont.Height = -11
                    TitleFont.Name = 'MS Sans Serif'
                    TitleFont.Style = []
                    Columns = <
                      item
                        Expanded = False
                        FieldName = 'NomeItemExame'
                        Title.Caption = 'Item Exame'
                        Visible = True
                      end
                      item
                        Expanded = False
                        FieldName = 'Resultado1'
                        Title.Caption = '1'#186' Resultado'
                        Visible = True
                      end
                      item
                        Expanded = False
                        FieldName = 'Resultado2'
                        Title.Caption = '2'#186' Resultado'
                        Visible = True
                      end
                      item
                        Expanded = False
                        FieldName = 'ResultadoTexto'
                        Visible = True
                      end
                      item
                        Expanded = False
                        FieldName = 'Referencia1'
                        Title.Caption = '1'#186' Referencia'
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
                        Title.Caption = '2'#186' Referencia'
                        Visible = True
                      end
                      item
                        Expanded = False
                        FieldName = 'Unidade2'
                        Visible = True
                      end
                      item
                        Expanded = False
                        FieldName = 'Obrigatorio'
                        Title.Caption = 'Obrigat'#243'rio'
                        Visible = True
                      end
                      item
                        Expanded = False
                        FieldName = 'DigitaCampo'
                        Title.Caption = 'Digita Campo'
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
              end
            end
          end
        end
      end
      object TSItens: TTabSheet
        Caption = 'Itens'
        ImageIndex = 2
        object Panel11: TPanel
          Left = 805
          Top = 0
          Width = 156
          Height = 453
          Align = alRight
          TabOrder = 0
          object BbtnGravaItens: TBitBtn
            Left = 2
            Top = 2
            Width = 151
            Height = 71
            Cursor = crHandPoint
            Caption = '&Gravar Resultado Exame'
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -11
            Font.Name = 'Arial'
            Font.Style = []
            ParentFont = False
            TabOrder = 0
            OnClick = BbtnGravaItensClick
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
          object BbtnCancelaItens: TBitBtn
            Left = 2
            Top = 72
            Width = 151
            Height = 71
            Cursor = crHandPoint
            Caption = '&Cancelar Lan'#231'amento Exame'
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -11
            Font.Name = 'Arial'
            Font.Style = []
            ParentFont = False
            TabOrder = 1
            Visible = False
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
            Layout = blGlyphTop
            NumGlyphs = 2
          end
          object BbtnFechar: TBitBtn
            Left = 2
            Top = 142
            Width = 151
            Height = 71
            Cursor = crHandPoint
            Caption = '&Fechar Lan'#231'amento Exame'
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -11
            Font.Name = 'Arial'
            Font.Style = []
            ParentFont = False
            TabOrder = 2
            OnClick = BbtnCancelaItensClick
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
        object ScrollBox2: TScrollBox
          Left = 0
          Top = 0
          Width = 805
          Height = 453
          Align = alClient
          Font.Charset = ANSI_CHARSET
          Font.Color = clWindowText
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = []
          ParentFont = False
          TabOrder = 1
          object Label24: TLabel
            Left = 40
            Top = 16
            Width = 41
            Height = 16
            Caption = 'Exame'
          end
          object Label2: TLabel
            Left = 40
            Top = 56
            Width = 144
            Height = 16
            Caption = 'Nome do Item do Exame'
          end
          object Label11: TLabel
            Left = 42
            Top = 296
            Width = 166
            Height = 16
            Caption = 'Observa'#231#227'o Geral do Exame'
          end
          object DBText1: TDBText
            Left = 40
            Top = 32
            Width = 577
            Height = 17
            DataField = 'NomeExame'
            DataSource = DSMovExames
            Font.Charset = ANSI_CHARSET
            Font.Color = clMaroon
            Font.Height = -13
            Font.Name = 'Arial'
            Font.Style = [fsBold]
            ParentFont = False
          end
          object DBText2: TDBText
            Left = 40
            Top = 74
            Width = 417
            Height = 17
            DataField = 'NomeItemExame'
            DataSource = DSMovItensExames
            Font.Charset = ANSI_CHARSET
            Font.Color = clMaroon
            Font.Height = -13
            Font.Name = 'Arial'
            Font.Style = [fsBold]
            ParentFont = False
          end
          object Label19: TLabel
            Left = 456
            Top = 56
            Width = 46
            Height = 16
            Caption = 'Material'
          end
          object PageControl2: TPageControl
            Left = 40
            Top = 96
            Width = 737
            Height = 193
            ActivePage = TabSheet1
            TabOrder = 0
            object TabSheet1: TTabSheet
              Caption = 'TabSheet1'
              object Label3: TLabel
                Left = 8
                Top = 25
                Width = 74
                Height = 16
                Caption = '1'#186' Resultado'
              end
              object Label6: TLabel
                Left = 152
                Top = 25
                Width = 77
                Height = 16
                Caption = '1'#186' Refer'#234'ncia'
                FocusControl = DBEdit4
              end
              object Label4: TLabel
                Left = 8
                Top = 73
                Width = 74
                Height = 16
                Caption = '2'#186' Resultado'
              end
              object Label8: TLabel
                Left = 152
                Top = 73
                Width = 77
                Height = 16
                Caption = '2'#186' Refer'#234'ncia'
                FocusControl = DBEdit5
              end
              object Label10: TLabel
                Left = 376
                Top = 25
                Width = 47
                Height = 16
                Caption = 'Unidade'
                FocusControl = DBEdit6
              end
              object DBText3: TDBText
                Left = 8
                Top = 132
                Width = 137
                Height = 17
                DataField = 'Minimo'
                DataSource = DSMovItensExames
                Font.Charset = ANSI_CHARSET
                Font.Color = clMaroon
                Font.Height = -13
                Font.Name = 'Arial'
                Font.Style = [fsBold]
                ParentFont = False
              end
              object DBText4: TDBText
                Left = 152
                Top = 132
                Width = 137
                Height = 17
                DataField = 'Maximo'
                DataSource = DSMovItensExames
                Font.Charset = ANSI_CHARSET
                Font.Color = clMaroon
                Font.Height = -13
                Font.Name = 'Arial'
                Font.Style = [fsBold]
                ParentFont = False
              end
              object Label15: TLabel
                Left = 8
                Top = 112
                Width = 42
                Height = 16
                Caption = 'M'#237'nimo'
              end
              object Label16: TLabel
                Left = 152
                Top = 112
                Width = 46
                Height = 16
                Caption = 'M'#225'ximo'
              end
              object Label32: TLabel
                Left = 376
                Top = 73
                Width = 47
                Height = 16
                Caption = 'Unidade'
                FocusControl = DBEdit1
              end
              object Label25: TLabel
                Left = 8
                Top = 1
                Width = 549
                Height = 16
                Caption = 
                  'Para Cancelar um Resultado J'#225' Digitado, Colocar nele -1  <<<Some' +
                  'nte Campo Num'#233'rico>>>>'
              end
              object DBText5: TDBText
                Left = 664
                Top = 8
                Width = 65
                Height = 17
                DataField = 'Obrigatorio'
                DataSource = DSMovItensExames
              end
              object Label33: TLabel
                Left = 600
                Top = 8
                Width = 63
                Height = 16
                Caption = 'Obrigat'#243'rio'
              end
              object DBEdit4: TDBEdit
                Left = 152
                Top = 41
                Width = 185
                Height = 24
                DataField = 'Referencia1'
                DataSource = DSMovItensExames
                Enabled = False
                TabOrder = 0
              end
              object DBEdit5: TDBEdit
                Left = 152
                Top = 89
                Width = 199
                Height = 24
                DataField = 'Referencia2'
                DataSource = DSMovItensExames
                Enabled = False
                TabOrder = 1
              end
              object DBEdit6: TDBEdit
                Left = 376
                Top = 41
                Width = 199
                Height = 24
                DataField = 'Unidade1'
                DataSource = DSMovItensExames
                Enabled = False
                TabOrder = 2
              end
              object DBEdit1: TDBEdit
                Left = 376
                Top = 89
                Width = 199
                Height = 24
                DataField = 'Unidade2'
                DataSource = DSMovItensExames
                Enabled = False
                TabOrder = 3
              end
              object Dbedit2: TRxDBCalcEdit
                Left = 8
                Top = 41
                Width = 121
                Height = 21
                DataField = 'Resultado1'
                DataSource = DSMovItensExames
                DisplayFormat = '#,###,###,###.##'
                NumGlyphs = 2
                TabOrder = 4
                OnChange = Dbedit2Change
              end
              object DBEdit3: TRxDBCalcEdit
                Left = 8
                Top = 90
                Width = 121
                Height = 21
                DataField = 'Resultado2'
                DataSource = DSMovItensExames
                DisplayFormat = '#,###,###,###.##'
                NumGlyphs = 2
                TabOrder = 5
              end
            end
            object TabSheet2: TTabSheet
              Caption = 'TabSheet2'
              ImageIndex = 1
              object Label5: TLabel
                Left = 0
                Top = 0
                Width = 89
                Height = 16
                Caption = 'ResultadoTexto'
                FocusControl = DBMemo1
              end
              object DBMemo1: TDBMemo
                Left = 0
                Top = 28
                Width = 721
                Height = 125
                DataField = 'ResultadoTexto'
                DataSource = DSMovItensExames
                TabOrder = 0
              end
            end
          end
          object Memo1: TMemo
            Left = 40
            Top = 312
            Width = 737
            Height = 89
            Lines.Strings = (
              'Memo1')
            TabOrder = 1
          end
          object Edit1: TEdit
            Left = 456
            Top = 72
            Width = 321
            Height = 24
            TabOrder = 2
            Text = 'Edit1'
          end
          object BbtnVolta: TBitBtn
            Left = 568
            Top = 9
            Width = 109
            Height = 39
            Caption = 'Volta'
            TabOrder = 3
            OnClick = BbtnVoltaClick
            Glyph.Data = {
              76020000424D7602000000000000760000002800000020000000200000000100
              0400000000000002000000000000000000001000000000000000000000000000
              8000008000000080800080000000800080008080000080808000C0C0C0000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888880888888888888888888888888888888
              0088888888888888888888888888888000888888888888888888888888888800
              0088888888888888888888888888800000888888888888888888888888880000
              0088888888888888888888888880000000000000000000008888888888000000
              0000000000000000888888888000000000000000000000008888888800000000
              0000000000000000888888800000000000000000000000008888888800000000
              0000000000000000888888888000000000000000000000008888888888000000
              0000000000000000888888888880000000000000000000008888888888880000
              0088888888888888888888888888800000888888888888888888888888888800
              0088888888888888888888888888888000888888888888888888888888888888
              0088888888888888888888888888888880888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888}
          end
          object BbtnAvanca: TBitBtn
            Left = 680
            Top = 9
            Width = 109
            Height = 39
            Caption = 'Avan'#231'a'
            TabOrder = 4
            OnClick = BbtnAvancaClick
            Glyph.Data = {
              76020000424D7602000000000000760000002800000020000000200000000100
              0400000000000002000000000000000000001000000000000000000000000000
              8000008000000080800080000000800080008080000080808000C0C0C0000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888088888888888888888888888888888880088888888888888888888888
              8888888000888888888888888888888888888880000888888888888888888888
              8888888000008888888888880000000000000000000008888888888800000000
              0000000000000088888888880000000000000000000000088888888800000000
              0000000000000000888888880000000000000000000000000888888800000000
              0000000000000000888888880000000000000000000000088888888800000000
              0000000000000088888888880000000000000000000008888888888888888888
              8888888000008888888888888888888888888880000888888888888888888888
              8888888000888888888888888888888888888880088888888888888888888888
              8888888088888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888888888888888
              8888888888888888888888888888888888888888888888888888}
            Layout = blGlyphRight
          end
        end
      end
      object TSLaudo: TTabSheet
        Caption = 'TSLaudo'
        ImageIndex = 2
        object Panel17: TPanel
          Left = 805
          Top = 0
          Width = 156
          Height = 453
          Align = alRight
          TabOrder = 0
          object BitBtn2: TBitBtn
            Left = 2
            Top = 2
            Width = 151
            Height = 71
            Cursor = crHandPoint
            Caption = '&Gravar Profissional Resp.'
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -11
            Font.Name = 'Arial'
            Font.Style = []
            ParentFont = False
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
            Layout = blGlyphTop
            NumGlyphs = 2
          end
          object BitBtn3: TBitBtn
            Left = 2
            Top = 72
            Width = 151
            Height = 71
            Cursor = crHandPoint
            Caption = '&Cancelar Lan'#231'amento Resp.'
            Font.Charset = ANSI_CHARSET
            Font.Color = clWindowText
            Font.Height = -11
            Font.Name = 'Arial'
            Font.Style = []
            ParentFont = False
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
            Layout = blGlyphTop
            NumGlyphs = 2
          end
        end
        object ScrollBox1: TScrollBox
          Left = 0
          Top = 0
          Width = 805
          Height = 453
          Align = alClient
          TabOrder = 1
          object Label17: TLabel
            Left = 26
            Top = 40
            Width = 174
            Height = 13
            Caption = 'Profissional Respons'#225'vel pelo Laudo'
          end
          object RxDBLookupCombo3: TRxDBLookupCombo
            Left = 24
            Top = 56
            Width = 633
            Height = 21
            DropDownCount = 8
            DataField = 'CodProfLaudo'
            DataSource = DSQualquer
            LookupField = 'CodProfLaudo'
            LookupDisplay = 'NomeProfLaudo'
            LookupSource = DSProfLaudo
            TabOrder = 0
          end
          object CheckBox1: TCheckBox
            Left = 24
            Top = 88
            Width = 185
            Height = 17
            Caption = 'Assinatura do Eletr'#244'nica'
            Checked = True
            State = cbChecked
            TabOrder = 1
          end
          object CheckBox2: TCheckBox
            Left = 312
            Top = 88
            Width = 185
            Height = 17
            Caption = 'Exames Conclu'#237'do ??? '
            Checked = True
            State = cbChecked
            TabOrder = 2
          end
        end
      end
    end
  end
  object QryQualquer: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select distinct Mp.*, C.Nome as Cliente, e.nomeespecie,'
      
        '                l.AbrevConselho, l.NomeprofLaudo,  l.NumConselho' +
        ', year(mp.datapedido) as ano,'
      
        '                Pr.NomeprofSolic, Pr.AbrevConselho as AbrevConsS' +
        'olic, Pr.NumConselho as NumConsSolic  '
      ''
      'From MovPedido Mp '
      
        '                Left join Cliente c on mp.codcliente = c.codclie' +
        'nte'
      
        '                Left Join Especie e on mp.codespecie = e.codespe' +
        'cie'
      
        '                Left Join ProfissionalLaudo l on mp.codproflaudo' +
        ' = l.codproflaudo'
      
        '                Left Join ProfissionalSolicitante PR on mp.CodPr' +
        'ofSolic = pr.CodProfsolic'
      
        '      Left Join MovExames me on me.codmovpedido = mp.codmovpedid' +
        'o'
      '      left join Exames ex on ex.codexame = me.codexame'
      'Where '
      '(MP.codcliente = :codcliente or :codcliente = -1)'
      'and'
      '(MP.codespecie = :codespecie or :codespecie = -1)'
      'and'
      '(me.codExame = :codExame or :CodExame = -1)'
      'and'
      ''
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
        ParamType = ptUnknown
      end
      item
        DataType = ftInteger
        Name = 'codespecie'
        ParamType = ptUnknown
      end
      item
        DataType = ftInteger
        Name = 'codExame'
        ParamType = ptUnknown
      end
      item
        DataType = ftInteger
        Name = 'CodExame'
        ParamType = ptUnknown
      end
      item
        DataType = ftString
        Name = 'NomeAnimal'
        ParamType = ptUnknown
      end
      item
        DataType = ftString
        Name = 'NomeAnimal'
        ParamType = ptUnknown
      end
      item
        DataType = ftString
        Name = 'Proprietario'
        ParamType = ptUnknown
      end
      item
        DataType = ftString
        Name = 'Proprietario'
        ParamType = ptUnknown
      end
      item
        DataType = ftString
        Name = 'IdadeAnimal'
        ParamType = ptUnknown
      end
      item
        DataType = ftString
        Name = 'IdadeAnimal'
        ParamType = ptUnknown
      end
      item
        DataType = ftString
        Name = 'SexoAnimal'
        ParamType = ptUnknown
      end
      item
        DataType = ftString
        Name = 'SexoAnimal'
        ParamType = ptUnknown
      end
      item
        DataType = ftInteger
        Name = 'CodigoPedido'
        ParamType = ptUnknown
      end
      item
        DataType = ftInteger
        Name = 'CodigoPedido'
        ParamType = ptUnknown
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
        DataType = ftInteger
        Name = 'codigointerno'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codigointerno'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'status'
        ParamType = ptUnknown
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
    object QryQualquerDataLiberacao: TDateTimeField
      FieldName = 'DataLiberacao'
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
    object QryQualquerAbrevConselho: TStringField
      FieldName = 'AbrevConselho'
      FixedChar = True
      Size = 10
    end
    object QryQualquerNomeprofLaudo: TStringField
      FieldName = 'NomeprofLaudo'
      FixedChar = True
      Size = 50
    end
    object QryQualquerNumConselho: TStringField
      FieldName = 'NumConselho'
      FixedChar = True
      Size = 15
    end
    object QryQualquerRaca: TStringField
      FieldName = 'Raca'
      FixedChar = True
      Size = 15
    end
    object QryQualquerano: TIntegerField
      FieldName = 'ano'
    end
    object QryQualquerNomeprofSolic: TStringField
      FieldName = 'NomeprofSolic'
      FixedChar = True
      Size = 50
    end
    object QryQualquerAbrevConsSolic: TStringField
      FieldName = 'AbrevConsSolic'
      FixedChar = True
      Size = 10
    end
    object QryQualquerNumConsSolic: TStringField
      FieldName = 'NumConsSolic'
      FixedChar = True
      Size = 15
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
      '  DataLiberacao = :DataLiberacao,'
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
      
        '   CodSeqContas, NomeAnimal, Proprietario, Idade, SexoAnimal, Da' +
        'taLiberacao, '
      '   Raca)'
      'values'
      
        '  (:CodigoInterno, :CodigoPedido, :Senha, :CodCliente, :CodEspec' +
        'ie, :CodProfSolic, '
      
        '   :CodProfLaudo, :AssinaturaScanner, :DataPedido, :HoraPedido, ' +
        ':DataEnvio, '
      
        '   :ValorTotal, :Pago, :FormadeEnvio, :Retirar, :Retirado, :Cont' +
        'ato, :Status, '
      
        '   :CodSeqContas, :NomeAnimal, :Proprietario, :Idade, :SexoAnima' +
        'l, :DataLiberacao, '
      '   :Raca)')
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
  end
  object DSCliente: TDataSource
    AutoEdit = False
    DataSet = QryCliente
    Left = 661
    Top = 234
  end
  object QRYEspecie: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select E.*'
      'From Especie E '
      'Order by E.NomeEspecie')
    Left = 621
    Top = 266
    object QRYEspecieCodEspecie: TAutoIncField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.Especie.CodEspecie'
    end
    object QRYEspecieNomeEspecie: TStringField
      FieldName = 'NomeEspecie'
      Origin = 'DNLABVET.Especie.NomeEspecie'
      FixedChar = True
    end
  end
  object DSEspecie: TDataSource
    AutoEdit = False
    DataSet = QRYEspecie
    Left = 661
    Top = 266
  end
  object QryMovExames: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    DataSource = DSQualquer
    SQL.Strings = (
      'Select Me.*'
      'From MovExames Me '
      'Where '
      '(me.CodMovPedido = :CodMovPedido)'
      'Order by Me.Liberado')
    UpdateObject = UPDItens
    Left = 389
    Top = 269
    ParamData = <
      item
        DataType = ftAutoInc
        Name = 'CodMovPedido'
        ParamType = ptInput
        Size = 4
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
    DataSource = DSMovExames
    SQL.Strings = (
      'Select Mei.*'
      'From MovItensExames Mei '
      'Where '
      '(mei.CodMovExames = :CodMovExames)'
      'and'
      '(Mei.DigitaCampo = '#39'S'#39')'
      'order by Mei.OrdemApresentacao')
    UpdateObject = UPDMovExamesItens
    Left = 469
    Top = 269
    ParamData = <
      item
        DataType = ftAutoInc
        Name = 'CodMovExames'
        ParamType = ptInput
        Size = 4
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
      DisplayFormat = '#,###,###,##0.00'
    end
    object QryMovItensExamesResultado2: TFloatField
      FieldName = 'Resultado2'
      Origin = 'DNLABVET.MovItensExames.Resultado2'
      DisplayFormat = '#,###,###,##0.00'
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
  object SP_UPD_MOVEXAMES: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_UPDATE_MOV_EXAMES'
    Left = 621
    Top = 148
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
  object SP_UPD_MOVITENSEXAMES: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_UPDATE_MOV_ITENS_EXAMES'
    Left = 661
    Top = 148
    ParamData = <
      item
        DataType = ftInteger
        Name = 'Result'
        ParamType = ptResult
      end
      item
        DataType = ftInteger
        Name = '@CodMovItensExames_1'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@Resultado1_2'
        ParamType = ptInput
      end
      item
        DataType = ftFloat
        Name = '@Resultado2_3'
        ParamType = ptInput
      end
      item
        DataType = ftMemo
        Name = '@ResultadoTexto_4'
        ParamType = ptInput
      end>
  end
  object SPLiberado: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_UPDATE_MOV_EXAMES_LIBERADO'
    Left = 738
    Top = 310
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
        DataType = ftString
        Name = '@Liberado_2'
        ParamType = ptInput
      end>
  end
  object QryMovExamesRel: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    DataSource = DSQualquer
    SQL.Strings = (
      'Select Me.*'
      'From MovExames Me '
      'Where '
      '(me.CodMovPedido = :CodMovPedido)'
      'and'
      '(Liberado = '#39'S'#39')'
      'Order by Me.Liberado')
    Left = 397
    Top = 501
    ParamData = <
      item
        DataType = ftAutoInc
        Name = 'CodMovPedido'
        ParamType = ptInput
        Size = 4
      end>
    object QryMovExamesRelCodMovExames: TAutoIncField
      FieldName = 'CodMovExames'
      Origin = 'DNLABVET.MovExames.CodMovExames'
    end
    object QryMovExamesRelCodMovPedido: TIntegerField
      FieldName = 'CodMovPedido'
      Origin = 'DNLABVET.MovExames.CodMovPedido'
    end
    object QryMovExamesRelCodExame: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.MovExames.CodExame'
    end
    object QryMovExamesRelDataProvResultado: TDateTimeField
      FieldName = 'DataProvResultado'
      Origin = 'DNLABVET.MovExames.DataProvResultado'
    end
    object QryMovExamesRelDataResultado: TDateTimeField
      FieldName = 'DataResultado'
      Origin = 'DNLABVET.MovExames.DataResultado'
    end
    object QryMovExamesRelValor: TFloatField
      FieldName = 'Valor'
      Origin = 'DNLABVET.MovExames.Valor'
    end
    object QryMovExamesRelObservacao: TMemoField
      FieldName = 'Observacao'
      Origin = 'DNLABVET.MovExames.Observacao'
      BlobType = ftMemo
    end
    object QryMovExamesRelCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.MovExames.CodEspecie'
    end
    object QryMovExamesRelNomeExame: TStringField
      FieldName = 'NomeExame'
      Origin = 'DNLABVET.MovExames.NomeExame'
      FixedChar = True
      Size = 50
    end
    object QryMovExamesRelNomeExameReduz: TStringField
      FieldName = 'NomeExameReduz'
      Origin = 'DNLABVET.MovExames.NomeExameReduz'
      FixedChar = True
      Size = 10
    end
    object QryMovExamesRelDias_Elaboracao_Exame: TIntegerField
      FieldName = 'Dias_Elaboracao_Exame'
      Origin = 'DNLABVET.MovExames.Dias_Elaboracao_Exame'
    end
    object QryMovExamesRelImprimirSeparado: TStringField
      FieldName = 'ImprimirSeparado'
      Origin = 'DNLABVET.MovExames.ImprimirSeparado'
      FixedChar = True
      Size = 1
    end
    object QryMovExamesRelMetodo: TStringField
      FieldName = 'Metodo'
      Origin = 'DNLABVET.MovExames.Metodo'
      FixedChar = True
    end
    object QryMovExamesRelMaterial: TStringField
      FieldName = 'Material'
      Origin = 'DNLABVET.MovExames.Material'
      FixedChar = True
      Size = 50
    end
    object QryMovExamesRelLiberado: TStringField
      FieldName = 'Liberado'
      Origin = 'DNLABVET.MovExames.Liberado'
      FixedChar = True
      Size = 1
    end
  end
  object DSMovExamesRel: TDataSource
    AutoEdit = False
    DataSet = QryMovExamesRel
    OnDataChange = DSMovExamesDataChange
    Left = 437
    Top = 501
  end
  object QryMovItensExamesRel: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    DataSource = DSMovExamesRel
    SQL.Strings = (
      'Select Mei.*'
      'From MovItensExames Mei '
      'Where '
      '(mei.CodMovExames = :CodMovExames)'
      'and'
      
        '(mei.resultado1 >= 0 or (datalength(mei.resultadotexto) > 1) or ' +
        'mei.Obrigatorio = '#39'S'#39')'
      'order by Mei.OrdemApresentacao')
    Left = 477
    Top = 501
    ParamData = <
      item
        DataType = ftAutoInc
        Name = 'CodMovExames'
        ParamType = ptInput
        Size = 4
      end>
    object QryMovItensExamesRelCodMovItensExames: TAutoIncField
      FieldName = 'CodMovItensExames'
      Origin = 'DNLABVET.MovItensExames.CodMovItensExames'
    end
    object QryMovItensExamesRelCodMovExames: TIntegerField
      FieldName = 'CodMovExames'
      Origin = 'DNLABVET.MovItensExames.CodMovExames'
    end
    object QryMovItensExamesRelCodExame: TIntegerField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.MovItensExames.CodExame'
    end
    object QryMovItensExamesRelCodItensExame: TIntegerField
      FieldName = 'CodItensExame'
      Origin = 'DNLABVET.MovItensExames.CodItensExame'
    end
    object QryMovItensExamesRelResultado1: TFloatField
      FieldName = 'Resultado1'
      Origin = 'DNLABVET.MovItensExames.Resultado1'
    end
    object QryMovItensExamesRelResultado2: TFloatField
      FieldName = 'Resultado2'
      Origin = 'DNLABVET.MovItensExames.Resultado2'
    end
    object QryMovItensExamesRelResultadoTexto: TMemoField
      FieldName = 'ResultadoTexto'
      Origin = 'DNLABVET.MovItensExames.ResultadoTexto'
      BlobType = ftMemo
    end
    object QryMovItensExamesRelOrdemApresentacao: TIntegerField
      FieldName = 'OrdemApresentacao'
      Origin = 'DNLABVET.MovItensExames.OrdemApresentacao'
    end
    object QryMovItensExamesRelNomeItemExame: TStringField
      FieldName = 'NomeItemExame'
      Origin = 'DNLABVET.MovItensExames.NomeItemExame'
      FixedChar = True
      Size = 30
    end
    object QryMovItensExamesRelReferencia1: TStringField
      FieldName = 'Referencia1'
      Origin = 'DNLABVET.MovItensExames.Referencia1'
      FixedChar = True
      Size = 15
    end
    object QryMovItensExamesRelReferencia2: TStringField
      FieldName = 'Referencia2'
      Origin = 'DNLABVET.MovItensExames.Referencia2'
      FixedChar = True
      Size = 15
    end
    object QryMovItensExamesRelUnidade1: TStringField
      FieldName = 'Unidade1'
      Origin = 'DNLABVET.MovItensExames.Unidade1'
      FixedChar = True
      Size = 15
    end
    object QryMovItensExamesRelUnidade2: TStringField
      FieldName = 'Unidade2'
      Origin = 'DNLABVET.MovItensExames.Unidade2'
      FixedChar = True
      Size = 15
    end
    object QryMovItensExamesRelDigitaCampo: TStringField
      FieldName = 'DigitaCampo'
      Origin = 'DNLABVET.MovItensExames.DigitaCampo'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesRelMinimo: TFloatField
      FieldName = 'Minimo'
      Origin = 'DNLABVET.MovItensExames.Minimo'
    end
    object QryMovItensExamesRelMaximo: TFloatField
      FieldName = 'Maximo'
      Origin = 'DNLABVET.MovItensExames.Maximo'
    end
    object QryMovItensExamesRelObrigatorio: TStringField
      FieldName = 'Obrigatorio'
      Origin = 'DNLABVET.MovItensExames.Obrigatorio'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesRelTipoCampo: TStringField
      FieldName = 'TipoCampo'
      Origin = 'DNLABVET.MovItensExames.TipoCampo'
      FixedChar = True
      Size = 1
    end
    object QryMovItensExamesRelCasasDecimais1: TIntegerField
      FieldName = 'CasasDecimais1'
      Origin = 'DNLABVET.MovItensExames.CasasDecimais1'
    end
    object QryMovItensExamesRelCasasDecimais2: TIntegerField
      FieldName = 'CasasDecimais2'
      Origin = 'DNLABVET.MovItensExames.CasasDecimais2'
    end
    object QryMovItensExamesRelTipoCampo2: TStringField
      FieldName = 'TipoCampo2'
      Origin = 'DNLABVET.MovItensExames.TipoCampo2'
      FixedChar = True
      Size = 1
    end
  end
  object DSMovItensExamesRel: TDataSource
    AutoEdit = False
    DataSet = QryMovItensExamesRel
    Left = 517
    Top = 501
  end
  object QryProfLaudo: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Profissionallaudo'
      'Where Ativo = '#39'S'#39
      'Order by NomeProflaudo')
    Left = 621
    Top = 418
    object QryProfLaudoCodProfLaudo: TAutoIncField
      FieldName = 'CodProfLaudo'
      Origin = 'DNLABVET.Profissionallaudo.CodProfLaudo'
    end
    object QryProfLaudoAbrevConselho: TStringField
      FieldName = 'AbrevConselho'
      Origin = 'DNLABVET.Profissionallaudo.AbrevConselho'
      FixedChar = True
      Size = 10
    end
    object QryProfLaudoNumConselho: TStringField
      FieldName = 'NumConselho'
      Origin = 'DNLABVET.Profissionallaudo.NumConselho'
      FixedChar = True
      Size = 15
    end
    object QryProfLaudoNomeProfLaudo: TStringField
      FieldName = 'NomeProfLaudo'
      Origin = 'DNLABVET.Profissionallaudo.NomeProfLaudo'
      FixedChar = True
      Size = 50
    end
    object QryProfLaudoUF: TStringField
      FieldName = 'UF'
      Origin = 'DNLABVET.Profissionallaudo.UF'
      FixedChar = True
      Size = 2
    end
    object QryProfLaudoAssinatura: TBlobField
      FieldName = 'Assinatura'
      Origin = 'DNLABVET.Profissionallaudo.Assinatura'
    end
    object QryProfLaudoAtivo: TStringField
      FieldName = 'Ativo'
      Origin = 'DNLABVET.Profissionallaudo.Ativo'
      FixedChar = True
      Size = 1
    end
    object QryProfLaudoFuncao: TStringField
      FieldName = 'Funcao'
      Origin = 'DNLABVET.Profissionallaudo.Funcao'
      FixedChar = True
      Size = 30
    end
    object QryProfLaudoMensagem_Qualidade: TStringField
      FieldName = 'Mensagem_Qualidade'
      Origin = 'DNLABVET.Profissionallaudo.Mensagem_Qualidade'
      FixedChar = True
      Size = 1
    end
  end
  object DSProfLaudo: TDataSource
    AutoEdit = False
    DataSet = QryProfLaudo
    Left = 661
    Top = 418
  end
  object SPRespLaudo: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_UPD_PEDIDO_RESP_LAUDO'
    Left = 733
    Top = 196
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
        Name = '@CodProfLaudo_2'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@AssinaturaScanner_3'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = '@Status_4'
        ParamType = ptInput
      end>
  end
  object QryExamesPedido: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Exames'
      'Where CodEspecie = :CodEspecie'
      'Order by NomeExame')
    Left = 621
    Top = 194
    ParamData = <
      item
        DataType = ftInteger
        Name = 'CodEspecie'
        ParamType = ptInput
      end>
    object QryExamesPedidoCodExame: TAutoIncField
      FieldName = 'CodExame'
      Origin = 'DNLABVET.Exames.CodExame'
    end
    object QryExamesPedidoCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.Exames.CodEspecie'
    end
    object QryExamesPedidoNomeExame: TStringField
      FieldName = 'NomeExame'
      Origin = 'DNLABVET.Exames.NomeExame'
      FixedChar = True
      Size = 50
    end
    object QryExamesPedidoNomeExameReduz: TStringField
      FieldName = 'NomeExameReduz'
      Origin = 'DNLABVET.Exames.NomeExameReduz'
      FixedChar = True
      Size = 10
    end
    object QryExamesPedidoValor: TFloatField
      FieldName = 'Valor'
      Origin = 'DNLABVET.Exames.Valor'
    end
    object QryExamesPedidoDias_Elaboracao_Exame: TIntegerField
      FieldName = 'Dias_Elaboracao_Exame'
      Origin = 'DNLABVET.Exames.Dias_Elaboracao_Exame'
    end
    object QryExamesPedidoImprimirSeparado: TStringField
      FieldName = 'ImprimirSeparado'
      Origin = 'DNLABVET.Exames.ImprimirSeparado'
      FixedChar = True
      Size = 1
    end
    object QryExamesPedidoMetodo: TStringField
      FieldName = 'Metodo'
      Origin = 'DNLABVET.Exames.Metodo'
      FixedChar = True
    end
    object QryExamesPedidoMaterial: TStringField
      FieldName = 'Material'
      Origin = 'DNLABVET.Exames.Material'
      FixedChar = True
      Size = 10
    end
  end
  object DSExamesPedido: TDataSource
    AutoEdit = False
    DataSet = QryExamesPedido
    Left = 661
    Top = 194
  end
end
