object FrmExtratoPedido: TFrmExtratoPedido
  Left = 71
  Top = 168
  Width = 830
  Height = 489
  Caption = 'Extrato de Pedidos'
  Color = clBtnFace
  Constraints.MaxHeight = 489
  Constraints.MaxWidth = 830
  Constraints.MinHeight = 489
  Constraints.MinWidth = 830
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  OnClose = FormClose
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object Panel1: TPanel
    Left = 718
    Top = 65
    Width = 104
    Height = 390
    Align = alRight
    TabOrder = 0
    object BBtnFechat: TBitBtn
      Left = 3
      Top = 325
      Width = 100
      Height = 40
      Cursor = crHandPoint
      Caption = '&Fechar'
      TabOrder = 0
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
    object BbtnAnalitico: TBitBtn
      Left = 2
      Top = 5
      Width = 101
      Height = 68
      Cursor = crHandPoint
      Caption = '&Anal'#237'tico'
      TabOrder = 1
      OnClick = BbtnAnaliticoClick
      Glyph.Data = {
        76020000424D7602000000000000760000002800000020000000200000000100
        0400000000000002000000000000000000001000000000000000000000000000
        8000008000000080800080000000800080008080000080808000C0C0C0000000
        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00FFF000000000
        00000000000000000FFFFFF78888888888888888888888880FFFFFF7FFFFFFFF
        FFFFFFFFFFFFFFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFFFFFFFFFFFFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFFFFFFFFFFFFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        000FF0000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        000FF0000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        000FF0000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        000FF0000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        000FF0000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        000FF0000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        000FF0000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        000FF0000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFFFFFFFFFFFFF80FFFFFF7FFFFFFFFFFFFFFFFFF0000000FFFFFF7FFFFFFFF
        FFFFFFFFFF7FF870FFFFFFF7FFFFFFFFFFFFFFFFFF7F870FFFFFFFF7FFFFFFFF
        FFFFFFFFFF7870FFFFFFFFF7FFFFFFFFFFFFFFFFFF770FFFFFFFFFF7FFFFFFFF
        FFFFFFFFFF70FFFFFFFFFFF77777777777777777777FFFFFFFFF}
      Layout = blGlyphTop
    end
    object BitBtn1: TBitBtn
      Left = 2
      Top = 72
      Width = 101
      Height = 68
      Cursor = crHandPoint
      Caption = '&Sint'#233'tico'
      TabOrder = 2
      OnClick = BitBtn1Click
      Glyph.Data = {
        76020000424D7602000000000000760000002800000020000000200000000100
        0400000000000002000000000000000000001000000000000000000000000000
        8000008000000080800080000000800080008080000080808000C0C0C0000000
        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00FFF000000000
        00000000000000000FFFFFF78888888888888888888888880FFFFFF7FFFFFFFF
        FFFFFFFFFFFFFFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFFFFFFFFFFFFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFFFFFFFFFFFFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFF00000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFF00000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFF00000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        00FF00000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFF00000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFF00000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFF00000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFF0000
        00FF00000000FFF80FFFFFF7FFFFFFFFFFFFFFFFFFFFFFF80FFFFFF7FFFFFFFF
        FFFFFFFFFFFFFFF80FFFFFF7FFFFFFFFFFFFFFFFFF0000000FFFFFF7FFFFFFFF
        FFFFFFFFFF7FF870FFFFFFF7FFFFFFFFFFFFFFFFFF7F870FFFFFFFF7FFFFFFFF
        FFFFFFFFFF7870FFFFFFFFF7FFFFFFFFFFFFFFFFFF770FFFFFFFFFF7FFFFFFFF
        FFFFFFFFFF70FFFFFFFFFFF77777777777777777777FFFFFFFFF}
      Layout = blGlyphTop
    end
    object BbtnExtratoClinica: TBitBtn
      Left = 3
      Top = 139
      Width = 101
      Height = 68
      Cursor = crHandPoint
      Caption = '&Extrato Cl'#237'nica'
      TabOrder = 3
      OnClick = BbtnExtratoClinicaClick
      Glyph.Data = {
        76020000424D7602000000000000760000002800000020000000200000000100
        0400000000000002000000000000000000001000000000000000000000000000
        8000008000000080800080000000800080008080000080808000C0C0C0000000
        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00000000000000
        0000000000000000000008888888888888888888887000000000088888888888
        888888888FF80000000008888888888888888888FFFF70000000088888888888
        8888888FFFFF800000000888888888888888FFFFF8FFF7000000088888788877
        7888FFFFF88FF80000000888870777078FF8008FFF7FFF0000000888FF800078
        FFFF7000FF80FF7000000888FF87078FFFF870007F70FF8000000888FFF7078F
        F88800000F007F80000008888FF0007888870000070008F0000008888F800007
        F8800000000007F70000088878700000F8770000000000F8000008877078778F
        70777000000000780000088710008FF8000310000000007F0000088730008FF8
        700010000000000F7000088770008FF8700770000000008F7000088877007FF8
        70007000000007FFF7000888777008F87777700000008F8888800888877007FF
        8777000000108888888008888877008778777700001088888880088881077707
        7070000000010888888008888100000008887700000108888880088811000788
        8888870000010888888008881100788888888870000108888880088810008888
        8888887700010888888008881008888888888887700088888880088800888888
        8888888877008888888008888888888888888888877888888880088888888888
        8888888888888888888000000000000000000000000000000000}
      Layout = blGlyphTop
    end
  end
  object Panel2: TPanel
    Left = 0
    Top = 0
    Width = 822
    Height = 65
    Align = alTop
    TabOrder = 1
    object Label1: TLabel
      Left = 16
      Top = 16
      Width = 53
      Height = 13
      Caption = 'Data Inicial'
    end
    object Label2: TLabel
      Left = 152
      Top = 16
      Width = 48
      Height = 13
      Caption = 'Data Final'
    end
    object Dti: TDateEdit
      Left = 16
      Top = 32
      Width = 121
      Height = 21
      NumGlyphs = 2
      TabOrder = 0
    end
    object Dtf: TDateEdit
      Left = 152
      Top = 32
      Width = 121
      Height = 21
      NumGlyphs = 2
      TabOrder = 1
    end
    object BbtnPesquisar: TBitBtn
      Left = 480
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
  end
  object Panel3: TPanel
    Left = 0
    Top = 65
    Width = 718
    Height = 390
    Align = alClient
    TabOrder = 2
    object StatusBar1: TStatusBar
      Left = 1
      Top = 370
      Width = 716
      Height = 19
      Panels = <
        item
          Text = 'Total'
          Width = 50
        end
        item
          Width = 200
        end>
    end
    object PageControl1: TPageControl
      Left = 1
      Top = 1
      Width = 716
      Height = 369
      ActivePage = TabSheet3
      Align = alClient
      TabOrder = 1
      object TabSheet1: TTabSheet
        Caption = 'Anal'#237'tico'
        object DBGrid1: TDBGrid
          Left = 0
          Top = 0
          Width = 708
          Height = 341
          Align = alClient
          DataSource = DSExtratoAna
          TabOrder = 0
          TitleFont.Charset = DEFAULT_CHARSET
          TitleFont.Color = clWindowText
          TitleFont.Height = -11
          TitleFont.Name = 'MS Sans Serif'
          TitleFont.Style = []
          Columns = <
            item
              Expanded = False
              FieldName = 'CodMovPedido'
              Title.Caption = 'Pedido'
              Width = 50
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'DataPedido'
              Title.Caption = 'Data'
              Width = 75
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'cliente'
              Title.Caption = 'Cl'#237'nica'
              Width = 200
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'NomeExame'
              Title.Caption = 'Exame'
              Width = 200
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'Valor'
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'NomeAnimal'
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'Proprietario'
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
            end>
        end
      end
      object TabSheet2: TTabSheet
        Caption = 'Sint'#233'tico'
        ImageIndex = 1
        object DBGrid2: TDBGrid
          Left = 0
          Top = 0
          Width = 708
          Height = 341
          Align = alClient
          DataSource = DSExtratoSint
          TabOrder = 0
          TitleFont.Charset = DEFAULT_CHARSET
          TitleFont.Color = clWindowText
          TitleFont.Height = -11
          TitleFont.Name = 'MS Sans Serif'
          TitleFont.Style = []
          Columns = <
            item
              Expanded = False
              FieldName = 'nomeexame'
              Title.Caption = 'Exame'
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'valor'
              Title.Caption = 'Valor'
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'qtde'
              Title.Caption = 'Qtde'
              Visible = True
            end>
        end
      end
      object TabSheet3: TTabSheet
        Caption = 'Extrato por Cl'#237'nica'
        ImageIndex = 2
        object DBGrid3: TDBGrid
          Left = 0
          Top = 0
          Width = 708
          Height = 341
          Align = alClient
          DataSource = DSCliente
          TabOrder = 0
          TitleFont.Charset = DEFAULT_CHARSET
          TitleFont.Color = clWindowText
          TitleFont.Height = -11
          TitleFont.Name = 'MS Sans Serif'
          TitleFont.Style = []
          Columns = <
            item
              Expanded = False
              FieldName = 'clinica'
              Visible = True
            end
            item
              Expanded = False
              FieldName = 'valor'
              Visible = True
            end>
        end
      end
    end
  end
  object QryExtratoAnal: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select m.*, e.*, c.nome as cliente'
      'From MovPedido m'
      '     Inner Join MovExames e on m.codmovpedido = e.codmovpedido'
      '     Inner Join Cliente c on m.codcliente = c.codcliente'
      'where m.datapedido between :dti and :dtf'
      '      and'
      '      Ativo = '#39'S'#39
      'order by m.codmovpedido')
    Left = 384
    Top = 24
    ParamData = <
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
    object QryExtratoAnalCodMovPedido: TAutoIncField
      FieldName = 'CodMovPedido'
    end
    object QryExtratoAnalDataPedido: TDateTimeField
      FieldName = 'DataPedido'
    end
    object QryExtratoAnalcliente: TStringField
      FieldName = 'cliente'
      FixedChar = True
      Size = 50
    end
    object QryExtratoAnalNomeAnimal: TStringField
      FieldName = 'NomeAnimal'
      FixedChar = True
    end
    object QryExtratoAnalNomeExame: TStringField
      FieldName = 'NomeExame'
      FixedChar = True
      Size = 50
    end
    object QryExtratoAnalProprietario: TStringField
      FieldName = 'Proprietario'
      FixedChar = True
      Size = 50
    end
    object QryExtratoAnalIdade: TStringField
      FieldName = 'Idade'
      FixedChar = True
      Size = 10
    end
    object QryExtratoAnalSexoAnimal: TStringField
      FieldName = 'SexoAnimal'
      FixedChar = True
      Size = 1
    end
    object QryExtratoAnalValor: TFloatField
      FieldName = 'Valor'
      currency = True
    end
  end
  object DSExtratoAna: TDataSource
    AutoEdit = False
    DataSet = QryExtratoAnal
    Left = 416
    Top = 24
  end
  object QryExtratoSint: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select e.nomeexame, valor, count(*) as qtde'
      'From MovPedido m'
      '     Inner Join MovExames e on m.codmovpedido = e.codmovpedido'
      '     Inner Join Cliente c on m.codcliente = c.codcliente'
      'where m.datapedido between :dti and :dtf'
      '      and'
      '      ativo = '#39'S'#39
      'group by e.nomeExame, valor'
      'order by e.nomeExame, valor')
    Left = 384
    Top = 64
    ParamData = <
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
    object QryExtratoSintnomeexame: TStringField
      FieldName = 'nomeexame'
      FixedChar = True
      Size = 50
    end
    object QryExtratoSintvalor: TFloatField
      FieldName = 'valor'
      currency = True
    end
    object QryExtratoSintqtde: TIntegerField
      FieldName = 'qtde'
    end
  end
  object DSExtratoSint: TDataSource
    AutoEdit = False
    DataSet = QryExtratoSint
    Left = 416
    Top = 64
  end
  object QryExtratoCliente: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select c.nome as clinica, Sum(valor) as valor'
      'From MovPedido m'
      '     Inner Join MovExames e on m.codmovpedido = e.codmovpedido'
      '     Inner Join Cliente c on m.codcliente = c.codcliente'
      'where m.datapedido between :dti and :dtf'
      'group by c.nome '
      'order by valor desc')
    Left = 381
    Top = 106
    ParamData = <
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
    object QryExtratoClienteclinica: TStringField
      FieldName = 'clinica'
      FixedChar = True
      Size = 50
    end
    object QryExtratoClientevalor: TFloatField
      FieldName = 'valor'
      currency = True
    end
  end
  object DSCliente: TDataSource
    AutoEdit = False
    DataSet = QryExtratoCliente
    Left = 416
    Top = 107
  end
end
