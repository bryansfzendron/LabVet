object FrmRetiraPedido: TFrmRetiraPedido
  Left = 94
  Top = 138
  Width = 843
  Height = 480
  Caption = 'Pedidos a Serem Retirados no Cliente'
  Color = clBtnFace
  Constraints.MaxHeight = 480
  Constraints.MaxWidth = 843
  Constraints.MinHeight = 480
  Constraints.MinWidth = 843
  Font.Charset = ANSI_CHARSET
  Font.Color = clWindowText
  Font.Height = -13
  Font.Name = 'Arial'
  Font.Style = []
  OldCreateOrder = False
  Position = poDesktopCenter
  OnActivate = FormActivate
  OnClose = FormClose
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 16
  object PageControl1: TPageControl
    Left = 0
    Top = 0
    Width = 835
    Height = 446
    ActivePage = TabSheet2
    Align = alClient
    TabOrder = 0
    object TabSheet1: TTabSheet
      Caption = 'TabSheet1'
      object Panel3: TPanel
        Left = 0
        Top = 0
        Width = 718
        Height = 415
        Align = alClient
        TabOrder = 0
        object Panel1: TPanel
          Left = 1
          Top = 1
          Width = 716
          Height = 190
          Align = alTop
          Caption = 'Panel1'
          TabOrder = 0
          object DBGrid1: TDBGrid
            Left = 1
            Top = 1
            Width = 714
            Height = 188
            Align = alClient
            DataSource = DSRetirada
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
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'CodigoInterno'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Cliente'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Endereco'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'numero'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'compl'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'bairro'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'cep'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'cidade'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'uf'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'telefone'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'fax'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Animal'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Cor'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'dono'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'nascimento'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Especie'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'AbrevConselho'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'NumConselho'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'NomeProfSolic'
                Visible = True
              end>
          end
        end
        object Panel4: TPanel
          Left = 1
          Top = 191
          Width = 716
          Height = 223
          Align = alClient
          Caption = 'Panel4'
          TabOrder = 1
          object DBGrid2: TDBGrid
            Left = 1
            Top = 1
            Width = 714
            Height = 221
            Align = alClient
            DataSource = DSExames
            TabOrder = 0
            TitleFont.Charset = ANSI_CHARSET
            TitleFont.Color = clWindowText
            TitleFont.Height = -13
            TitleFont.Name = 'Arial'
            TitleFont.Style = []
          end
        end
      end
      object Panel2: TPanel
        Left = 718
        Top = 0
        Width = 109
        Height = 415
        Align = alRight
        TabOrder = 1
        object SpeedButton5: TSpeedButton
          Left = 1
          Top = 2
          Width = 107
          Height = 81
          Caption = 'Lista de Retirada'
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
          OnClick = SpeedButton5Click
        end
        object BbtnFechar: TSpeedButton
          Left = 1
          Top = 332
          Width = 107
          Height = 81
          Caption = 'Fechar'
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
          OnClick = BbtnFecharClick
        end
      end
    end
    object TabSheet2: TTabSheet
      Caption = 'TabSheet2'
      ImageIndex = 1
      object Panel5: TPanel
        Left = 0
        Top = 0
        Width = 827
        Height = 415
        Align = alClient
        Caption = 'Panel4'
        TabOrder = 0
        object Panel6: TPanel
          Left = 716
          Top = 1
          Width = 110
          Height = 413
          Align = alRight
          TabOrder = 0
          object SBMaterialRetirado: TSpeedButton
            Left = 1
            Top = 2
            Width = 107
            Height = 87
            Caption = 'Material Retirado'
            Glyph.Data = {
              76020000424D7602000000000000760000002800000020000000200000000100
              0400000000000002000000000000000000001000000000000000000000000000
              8000008000000080800080000000800080008080000080808000C0C0C0000000
              FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00FFFFFFFFFFFF
              FFFFFFFF000000FFFFFFFFFFFFFFFFFFFFFFFF1199999900FFFFFFFFFFFFFFFF
              FFFFF199911119990FFFFFFFFFFFFFFFFFFF19901FFFF11990FFFFFFFFFFFFFF
              FFF1990FFF80FFF1990FFFFFFFFFFFFFFFF190FFFFFFFFFF190FFFFFFFFFFFFF
              FF1990FF3FFFFFFF1990F0000000000000190FFFF3FFFFFFF190333333333333
              33190F0FFF4448F8F1903B000000000000190F8FFF43FFF0F1903B7888888888
              88190FFFFF4F3FFFF1903B7FFFFFFFFFFF1990FFFF4FFFFF19903B7FFFFFFFFF
              FFF190FFFFFFFFFF190F3B7FFFFF89FFFFF1990FFF08FFF1990F3B7FFFF8998F
              FFFF19900FFFF11990FF3B7FFF89999FFFFF8199901119990FFF3B7FF8997998
              FFFF801199999910FFFF3B7FF998F999FFFF8030111111FFFFFF3B7FFFFFF899
              8FFF8030FFFFFFFFFFFF3B7FFFFFFF999FFF8030FFFFFFF9FFFF3B7FFFFFFF89
              98FF8030FFFFFF999FFF3B7FFFFFFFF999FF8030FFFFF99999FF3B7FFFFFFFFF
              FFFF8030FFFF9999999F3B7FFFFFFFFFFFFF8030FFFFFF999FFF3B7FFFFFFFFF
              FFFF8030FFFFFF999FFF3B7FFF888888888F8030FFFFFF99FFFF3B7FF0000000
              008F8030FFFFF999FFFF3B7777FF888770777030FFFFF99FFFFF3BBBBB7FF877
              0BBBBB30FFFF99FFFFFFF3333337F8700333333FF999FFFFFFFFFFFFFF7FF887
              0FFFFFFFFFFFFFFFFFFFFFFFFF7777777FFFFFFFFFFFFFFFFFFF}
            Layout = blGlyphTop
            OnClick = SBMaterialRetiradoClick
          end
          object SpeedButton2: TSpeedButton
            Left = 1
            Top = 332
            Width = 107
            Height = 81
            Caption = 'Fechar'
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
            OnClick = BbtnFecharClick
          end
        end
        object Panel7: TPanel
          Left = 1
          Top = 1
          Width = 715
          Height = 413
          Align = alClient
          Caption = 'Panel7'
          TabOrder = 1
          object DBGrid3: TDBGrid
            Left = 1
            Top = 1
            Width = 713
            Height = 191
            Align = alClient
            DataSource = DSRetirada
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
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'CodigoInterno'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Cliente'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Endereco'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'numero'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'compl'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'bairro'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'cep'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'cidade'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'uf'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'telefone'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'fax'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Animal'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Cor'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'dono'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'nascimento'
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'Especie'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'AbrevConselho'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'NumConselho'
                Width = 64
                Visible = True
              end
              item
                Expanded = False
                FieldName = 'NomeProfSolic'
                Width = 64
                Visible = True
              end>
          end
          object DBGrid4: TDBGrid
            Left = 1
            Top = 192
            Width = 713
            Height = 220
            Align = alBottom
            DataSource = DSExames
            TabOrder = 1
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
  object QryRetirada: TQuery
    DatabaseName = 'DNLABVET'
    SessionName = 'Default'
    SQL.Strings = (
      'Select Ped.*,'
      '          C.nome as Cliente, c.Endereco, Ped.Horapedido,'
      
        '          C.numero, c.compl, c.bairro, c.cep, c.cidade, c.uf, c.' +
        'telefone,'
      '          c.fax, c.contato,'
      
        '          e.codEspecie, e.NomeEspecie as Especie, Ps.AbrevConsel' +
        'ho, '
      '          Ps.NumConselho, Ps.NomeProfSolic'
      'from MovPedido Ped '
      '     left Join Cliente c on ped.codcliente = c.codcliente'
      '     left Join Especie e on ped.codespecie = e.codespecie'
      
        '     Left Join ProfissionalSolicitante ps on ped.codProfSolic = ' +
        'ps.CodProfSolic'
      'where  Ped.retirar  =  '#39'S'#39' '
      '   and (Ped.Retirado <> '#39'S'#39' or Ped.Retirado is null)')
    Left = 457
    Top = 41
    object QryRetiradaCodMovPedido: TAutoIncField
      FieldName = 'CodMovPedido'
    end
    object QryRetiradaCodigoInterno: TStringField
      FieldName = 'CodigoInterno'
      FixedChar = True
    end
    object QryRetiradaCodigoPedido: TIntegerField
      FieldName = 'CodigoPedido'
    end
    object QryRetiradaSenha: TStringField
      FieldName = 'Senha'
      FixedChar = True
    end
    object QryRetiradaCodCliente: TIntegerField
      FieldName = 'CodCliente'
    end
    object QryRetiradaCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
    end
    object QryRetiradaCodProfSolic: TIntegerField
      FieldName = 'CodProfSolic'
    end
    object QryRetiradaCodProfLaudo: TIntegerField
      FieldName = 'CodProfLaudo'
    end
    object QryRetiradaAssinaturaScanner: TStringField
      FieldName = 'AssinaturaScanner'
      FixedChar = True
      Size = 1
    end
    object QryRetiradaDataPedido: TDateTimeField
      FieldName = 'DataPedido'
    end
    object QryRetiradaHoraPedido: TStringField
      FieldName = 'HoraPedido'
      FixedChar = True
      Size = 5
    end
    object QryRetiradaDataEnvio: TDateTimeField
      FieldName = 'DataEnvio'
    end
    object QryRetiradaValorTotal: TFloatField
      FieldName = 'ValorTotal'
    end
    object QryRetiradaPago: TStringField
      FieldName = 'Pago'
      FixedChar = True
      Size = 1
    end
    object QryRetiradaFormadeEnvio: TStringField
      FieldName = 'FormadeEnvio'
      FixedChar = True
      Size = 15
    end
    object QryRetiradaRetirar: TStringField
      FieldName = 'Retirar'
      FixedChar = True
      Size = 1
    end
    object QryRetiradaRetirado: TStringField
      FieldName = 'Retirado'
      FixedChar = True
      Size = 1
    end
    object QryRetiradaContato: TStringField
      FieldName = 'Contato'
      FixedChar = True
    end
    object QryRetiradaStatus: TStringField
      FieldName = 'Status'
      FixedChar = True
      Size = 1
    end
    object QryRetiradaCodSeqContas: TIntegerField
      FieldName = 'CodSeqContas'
    end
    object QryRetiradaNomeAnimal: TStringField
      FieldName = 'NomeAnimal'
      FixedChar = True
    end
    object QryRetiradaProprietario: TStringField
      FieldName = 'Proprietario'
      FixedChar = True
      Size = 50
    end
    object QryRetiradaIdade: TStringField
      FieldName = 'Idade'
      FixedChar = True
      Size = 10
    end
    object QryRetiradaSexoAnimal: TStringField
      FieldName = 'SexoAnimal'
      FixedChar = True
      Size = 1
    end
    object QryRetiradaCliente: TStringField
      FieldName = 'Cliente'
      FixedChar = True
      Size = 50
    end
    object QryRetiradaEndereco: TStringField
      FieldName = 'Endereco'
      FixedChar = True
      Size = 40
    end
    object QryRetiradaHorapedido_1: TStringField
      FieldName = 'Horapedido_1'
      FixedChar = True
      Size = 5
    end
    object QryRetiradanumero: TStringField
      FieldName = 'numero'
      FixedChar = True
      Size = 50
    end
    object QryRetiradacompl: TStringField
      FieldName = 'compl'
      FixedChar = True
    end
    object QryRetiradabairro: TStringField
      FieldName = 'bairro'
      FixedChar = True
      Size = 30
    end
    object QryRetiradacep: TStringField
      FieldName = 'cep'
      FixedChar = True
      Size = 9
    end
    object QryRetiradacidade: TStringField
      FieldName = 'cidade'
      FixedChar = True
      Size = 30
    end
    object QryRetiradauf: TStringField
      FieldName = 'uf'
      FixedChar = True
      Size = 2
    end
    object QryRetiradatelefone: TStringField
      FieldName = 'telefone'
      FixedChar = True
      Size = 13
    end
    object QryRetiradafax: TStringField
      FieldName = 'fax'
      FixedChar = True
      Size = 13
    end
    object QryRetiradacontato_1: TStringField
      FieldName = 'contato_1'
      FixedChar = True
      Size = 15
    end
    object QryRetiradacodEspecie_1: TAutoIncField
      FieldName = 'codEspecie_1'
    end
    object QryRetiradaEspecie: TStringField
      FieldName = 'Especie'
      FixedChar = True
    end
    object QryRetiradaAbrevConselho: TStringField
      FieldName = 'AbrevConselho'
      FixedChar = True
      Size = 10
    end
    object QryRetiradaNumConselho: TStringField
      FieldName = 'NumConselho'
      FixedChar = True
      Size = 15
    end
    object QryRetiradaNomeProfSolic: TStringField
      FieldName = 'NomeProfSolic'
      FixedChar = True
      Size = 50
    end
  end
  object DSRetirada: TDataSource
    AutoEdit = False
    DataSet = QryRetirada
    Left = 492
    Top = 42
  end
  object QryExames: TQuery
    DatabaseName = 'DNLABVET'
    DataSource = DSRetirada
    SQL.Strings = (
      'Select NomeExame'
      'From MovExames '
      ' '
      'Where'
      '    CodMovPedido = :CodMovPedido')
    Left = 461
    Top = 84
    ParamData = <
      item
        DataType = ftAutoInc
        Name = 'CodMovPedido'
        ParamType = ptInput
        Size = 4
      end>
    object QryExamesNomeExame: TStringField
      FieldName = 'NomeExame'
      Origin = 'DNLABVET.MovExames.NomeExame'
      FixedChar = True
      Size = 50
    end
  end
  object DSExames: TDataSource
    AutoEdit = False
    DataSet = QryExames
    Left = 493
    Top = 84
  end
  object SP_PedidoRetirado: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_UPD_PEDIDO_RETIRADO'
    Left = 597
    Top = 100
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
      end>
  end
end
