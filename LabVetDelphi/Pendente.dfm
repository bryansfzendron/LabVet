object FrmPendentes: TFrmPendentes
  Left = 59
  Top = 205
  Width = 857
  Height = 480
  Caption = 'Exames Pendentes'
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  OnActivate = FormActivate
  OnClose = FormClose
  PixelsPerInch = 96
  TextHeight = 13
  object Panel2: TPanel
    Left = 747
    Top = 0
    Width = 102
    Height = 446
    Align = alRight
    TabOrder = 0
    object SBFechar: TSpeedButton
      Left = 2
      Top = 73
      Width = 96
      Height = 71
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
      OnClick = SpeedButton3Click
    end
    object SBImprimir: TSpeedButton
      Left = 2
      Top = 2
      Width = 96
      Height = 71
      Caption = '&Imprimir'
      Font.Charset = ANSI_CHARSET
      Font.Color = clBlack
      Font.Height = -13
      Font.Name = 'Arial'
      Font.Style = []
      Glyph.Data = {
        76010000424D7601000000000000760000002800000020000000100000000100
        04000000000000010000120B0000120B00001000000000000000000000000000
        800000800000008080008000000080008000808000007F7F7F00BFBFBF000000
        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00300000000000
        0003377777777777777308888888888888807F33333333333337088888888888
        88807FFFFFFFFFFFFFF7000000000000000077777777777777770F8F8F8F8F8F
        8F807F333333333333F708F8F8F8F8F8F9F07F333333333337370F8F8F8F8F8F
        8F807FFFFFFFFFFFFFF7000000000000000077777777777777773330FFFFFFFF
        03333337F3FFFF3F7F333330F0000F0F03333337F77773737F333330FFFFFFFF
        03333337F3FF3FFF7F333330F00F000003333337F773777773333330FFFF0FF0
        33333337F3F37F3733333330F08F0F0333333337F7337F7333333330FFFF0033
        33333337FFFF7733333333300000033333333337777773333333}
      Layout = blGlyphTop
      NumGlyphs = 2
      ParentFont = False
      ParentShowHint = False
      ShowHint = False
      OnClick = SBImprimirClick
    end
    object GroupBox3: TGroupBox
      Left = 3
      Top = 190
      Width = 96
      Height = 58
      Caption = 'Status'
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clBlue
      Font.Height = -11
      Font.Name = 'MS Sans Serif'
      Font.Style = []
      ParentFont = False
      TabOrder = 0
      object Label12: TLabel
        Left = 2
        Top = 28
        Width = 92
        Height = 13
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
        Top = 41
        Width = 92
        Height = 13
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
        Top = 15
        Width = 92
        Height = 13
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
  end
  object Panel3: TPanel
    Left = 0
    Top = 0
    Width = 747
    Height = 446
    Align = alClient
    Caption = 'Panel3'
    TabOrder = 1
    object Panel1: TPanel
      Left = 1
      Top = 1
      Width = 745
      Height = 192
      Align = alTop
      Caption = 'Panel1'
      TabOrder = 0
      object DBGrid1: TDBGrid
        Left = 1
        Top = 1
        Width = 743
        Height = 190
        Align = alClient
        Color = clInfoBk
        DataSource = DSPedido
        TabOrder = 0
        TitleFont.Charset = DEFAULT_CHARSET
        TitleFont.Color = clWindowText
        TitleFont.Height = -11
        TitleFont.Name = 'MS Sans Serif'
        TitleFont.Style = []
        OnCellClick = DBGrid2CellClick
        Columns = <
          item
            Expanded = False
            FieldName = 'CodMovPedido'
            Visible = True
          end
          item
            Expanded = False
            FieldName = 'CodigoPedido'
            Visible = True
          end
          item
            Expanded = False
            FieldName = 'Clinica'
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
            FieldName = 'NomeAnimal'
            Visible = True
          end
          item
            Expanded = False
            FieldName = 'Retirado'
            Visible = True
          end
          item
            Expanded = False
            FieldName = 'Contato'
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
          end
          item
            Expanded = False
            FieldName = 'DataLiberacao'
            Visible = True
          end>
      end
    end
    object Panel4: TPanel
      Left = 1
      Top = 193
      Width = 745
      Height = 252
      Align = alClient
      Caption = 'Panel4'
      TabOrder = 1
      object DBGrid2: TDBGrid
        Left = 1
        Top = 1
        Width = 743
        Height = 250
        Align = alClient
        Color = clInfoBk
        DataSource = DSExames
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
            FieldName = 'Observacao'
            Visible = True
          end
          item
            Expanded = False
            FieldName = 'Liberado'
            Visible = True
          end>
      end
    end
  end
  object QryPedidos: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select MP.*, c.nome as Clinica'
      'From MovPedido MP'
      '         left join Cliente C ON mp.codcliente = c.codcliente'
      'Where MP.Status <> '#39'C'#39)
    Left = 465
    Top = 41
    object QryPedidosCodMovPedido: TAutoIncField
      FieldName = 'CodMovPedido'
    end
    object QryPedidosCodigoInterno: TStringField
      FieldName = 'CodigoInterno'
      FixedChar = True
    end
    object QryPedidosCodigoPedido: TIntegerField
      FieldName = 'CodigoPedido'
    end
    object QryPedidosSenha: TStringField
      FieldName = 'Senha'
      FixedChar = True
    end
    object QryPedidosCodCliente: TIntegerField
      FieldName = 'CodCliente'
    end
    object QryPedidosCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
    end
    object QryPedidosCodProfSolic: TIntegerField
      FieldName = 'CodProfSolic'
    end
    object QryPedidosCodProfLaudo: TIntegerField
      FieldName = 'CodProfLaudo'
    end
    object QryPedidosAssinaturaScanner: TStringField
      FieldName = 'AssinaturaScanner'
      FixedChar = True
      Size = 1
    end
    object QryPedidosDataPedido: TDateTimeField
      FieldName = 'DataPedido'
    end
    object QryPedidosHoraPedido: TStringField
      FieldName = 'HoraPedido'
      FixedChar = True
      Size = 5
    end
    object QryPedidosDataEnvio: TDateTimeField
      FieldName = 'DataEnvio'
    end
    object QryPedidosValorTotal: TFloatField
      FieldName = 'ValorTotal'
    end
    object QryPedidosPago: TStringField
      FieldName = 'Pago'
      FixedChar = True
      Size = 1
    end
    object QryPedidosFormadeEnvio: TStringField
      FieldName = 'FormadeEnvio'
      FixedChar = True
      Size = 15
    end
    object QryPedidosRetirar: TStringField
      FieldName = 'Retirar'
      FixedChar = True
      Size = 1
    end
    object QryPedidosRetirado: TStringField
      FieldName = 'Retirado'
      FixedChar = True
      Size = 1
    end
    object QryPedidosContato: TStringField
      FieldName = 'Contato'
      FixedChar = True
    end
    object QryPedidosStatus: TStringField
      FieldName = 'Status'
      FixedChar = True
      Size = 1
    end
    object QryPedidosCodSeqContas: TIntegerField
      FieldName = 'CodSeqContas'
    end
    object QryPedidosNomeAnimal: TStringField
      FieldName = 'NomeAnimal'
      FixedChar = True
    end
    object QryPedidosProprietario: TStringField
      FieldName = 'Proprietario'
      FixedChar = True
      Size = 50
    end
    object QryPedidosIdade: TStringField
      FieldName = 'Idade'
      FixedChar = True
      Size = 10
    end
    object QryPedidosSexoAnimal: TStringField
      FieldName = 'SexoAnimal'
      FixedChar = True
      Size = 1
    end
    object QryPedidosDataLiberacao: TDateTimeField
      FieldName = 'DataLiberacao'
    end
    object QryPedidosClinica: TStringField
      FieldName = 'Clinica'
      FixedChar = True
      Size = 50
    end
  end
  object QryMovExames: TQuery
    DatabaseName = 'DNLABVET'
    DataSource = DSPedido
    SQL.Strings = (
      'Select * '
      'From MovExames'
      'Where codMovPedido = :CodMovPedido')
    Left = 465
    Top = 81
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
      OnGetText = QryMovExamesLiberadoGetText
      FixedChar = True
      Size = 1
    end
  end
  object DSPedido: TDataSource
    AutoEdit = False
    DataSet = QryPedidos
    Left = 497
    Top = 41
  end
  object DSExames: TDataSource
    AutoEdit = False
    DataSet = QryMovExames
    Left = 497
    Top = 81
  end
end
