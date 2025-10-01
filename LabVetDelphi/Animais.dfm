object FrmAnimais: TFrmAnimais
  Left = 204
  Top = 222
  Width = 696
  Height = 418
  Caption = 'Cadastro de Animais'
  Color = clBtnFace
  Constraints.MaxHeight = 418
  Constraints.MaxWidth = 696
  Constraints.MinHeight = 418
  Constraints.MinWidth = 696
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
    Width = 688
    Height = 91
    Align = alTop
    TabOrder = 0
    object Label1: TLabel
      Left = 13
      Top = 62
      Width = 28
      Height = 13
      Caption = 'Nome'
    end
    object Label9: TLabel
      Left = 13
      Top = 22
      Width = 32
      Height = 13
      Caption = 'Cliente'
    end
    object EdNome: TEdit
      Left = 56
      Top = 58
      Width = 353
      Height = 21
      TabOrder = 1
    end
    object BbtnPesquisar: TBitBtn
      Left = 560
      Top = 16
      Width = 105
      Height = 33
      Cursor = crHandPoint
      Caption = '&Pesquisar'
      TabOrder = 3
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
      Left = 414
      Top = 14
      Width = 139
      Height = 67
      BiDiMode = bdLeftToRight
      Caption = 'Status do Animal'
      Items.Strings = (
        'Ativo'
        'Desativado'
        'Todos')
      ParentBiDiMode = False
      TabOrder = 2
    end
    object RxDBLookupCombo2: TRxDBLookupCombo
      Left = 58
      Top = 17
      Width = 351
      Height = 21
      DropDownCount = 8
      LookupField = 'CodCliente'
      LookupDisplay = 'Nome'
      LookupSource = DSCliente
      TabOrder = 0
    end
  end
  object Panel3: TPanel
    Left = 0
    Top = 91
    Width = 688
    Height = 293
    Align = alClient
    Caption = 'Panel3'
    TabOrder = 1
    object PageControl1: TPageControl
      Left = 1
      Top = 1
      Width = 686
      Height = 291
      ActivePage = TSManutencao
      Align = alClient
      TabOrder = 0
      object TSPesquisa: TTabSheet
        Caption = 'Pesquisa'
        object Panel2: TPanel
          Left = 573
          Top = 0
          Width = 105
          Height = 263
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
          Width = 573
          Height = 263
          Align = alClient
          TabOrder = 1
          object DBGrid1: TDBGrid
            Left = 1
            Top = 1
            Width = 571
            Height = 261
            Align = alClient
            Color = clInfoBk
            DataSource = DSQualquer
            TabOrder = 0
            TitleFont.Charset = DEFAULT_CHARSET
            TitleFont.Color = clWindowText
            TitleFont.Height = -11
            TitleFont.Name = 'MS Sans Serif'
            TitleFont.Style = []
          end
        end
      end
      object TSManutencao: TTabSheet
        Caption = 'Manuten'#231#227'o'
        ImageIndex = 1
        object Label2: TLabel
          Left = 16
          Top = 24
          Width = 77
          Height = 13
          Caption = 'Nome do Animal'
          FocusControl = DBEdit1
        end
        object Label3: TLabel
          Left = 16
          Top = 71
          Width = 26
          Height = 13
          Caption = 'Dono'
          FocusControl = DBEdit2
        end
        object Label4: TLabel
          Left = 16
          Top = 160
          Width = 32
          Height = 13
          Caption = 'Cliente'
        end
        object Label6: TLabel
          Left = 224
          Top = 71
          Width = 16
          Height = 13
          Caption = 'Cor'
          FocusControl = DBEdit4
        end
        object Label7: TLabel
          Left = 16
          Top = 115
          Width = 26
          Height = 13
          Caption = 'Ra'#231'a'
          FocusControl = DBEdit5
        end
        object Label8: TLabel
          Left = 426
          Top = 69
          Width = 56
          Height = 13
          Caption = 'Nascimento'
        end
        object Label5: TLabel
          Left = 16
          Top = 208
          Width = 38
          Height = 13
          Caption = 'Esp'#233'cie'
        end
        object Panel4: TPanel
          Left = 571
          Top = 0
          Width = 107
          Height = 263
          Align = alRight
          TabOrder = 8
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
          Top = 40
          Width = 529
          Height = 21
          CharCase = ecUpperCase
          DataField = 'Nome'
          DataSource = DSQualquer
          TabOrder = 0
        end
        object DBEdit2: TDBEdit
          Left = 16
          Top = 87
          Width = 199
          Height = 21
          CharCase = ecUpperCase
          DataField = 'Dono'
          DataSource = DSQualquer
          TabOrder = 1
        end
        object RxDBLookupCombo1: TRxDBLookupCombo
          Left = 16
          Top = 176
          Width = 529
          Height = 23
          DropDownCount = 8
          DataField = 'CodCliente'
          DataSource = DSQualquer
          LookupField = 'CodCliente'
          LookupDisplay = 'Nome'
          LookupSource = DSCliente
          TabOrder = 5
        end
        object DBEdit4: TDBEdit
          Left = 224
          Top = 87
          Width = 176
          Height = 21
          CharCase = ecUpperCase
          DataField = 'Cor'
          DataSource = DSQualquer
          TabOrder = 2
        end
        object DBEdit5: TDBEdit
          Left = 16
          Top = 131
          Width = 137
          Height = 21
          CharCase = ecUpperCase
          DataField = 'Raca'
          DataSource = DSQualquer
          TabOrder = 4
        end
        object DBDateEdit1: TDBDateEdit
          Left = 424
          Top = 87
          Width = 121
          Height = 21
          DataField = 'Nascimento'
          DataSource = DSQualquer
          NumGlyphs = 2
          TabOrder = 3
        end
        object DBCheckBox1: TDBCheckBox
          Left = 400
          Top = 8
          Width = 97
          Height = 17
          Caption = 'Ativo'
          DataField = 'ativo'
          DataSource = DSQualquer
          Font.Charset = ANSI_CHARSET
          Font.Color = clRed
          Font.Height = -13
          Font.Name = 'Arial'
          Font.Style = [fsBold]
          ParentFont = False
          TabOrder = 7
          ValueChecked = 'S'
          ValueUnchecked = 'N'
        end
        object RxDBLookupCombo3: TRxDBLookupCombo
          Left = 16
          Top = 224
          Width = 529
          Height = 23
          DropDownCount = 8
          DataField = 'CodEspecie'
          DataSource = DSQualquer
          LookupField = 'CodEspecie'
          LookupDisplay = 'NomeEspecie'
          LookupSource = DSEspecie
          TabOrder = 6
        end
      end
    end
  end
  object QryQualquer: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select A.*, C.Nome as NomeCliente, E.NomeEspecie as Especie'
      
        'From Animal A inner join Cliente c on a.codcliente = c.codclient' +
        'e'
      '        inner join Especie E on a.codEspecie = e.codEspecie '
      'Where A.Nome Like :Nome'
      'and'
      '( A.Ativo = :status or :status = '#39'-1'#39')'
      'and'
      '(A.CodCliente = :codCliente or :codcliente = -1)'
      'Order by A.Nome')
    UpdateObject = UDPQualquer
    Left = 341
    Top = 125
    ParamData = <
      item
        DataType = ftString
        Name = 'Nome'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'status'
        ParamType = ptInput
      end
      item
        DataType = ftString
        Name = 'status'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codCliente'
        ParamType = ptInput
      end
      item
        DataType = ftInteger
        Name = 'codcliente'
        ParamType = ptInput
      end>
    object QryQualquerNome: TStringField
      FieldName = 'Nome'
      Origin = 'DNLABVET.Animal.Nome'
      FixedChar = True
      Size = 50
    end
    object QryQualquerDono: TStringField
      FieldName = 'Dono'
      Origin = 'DNLABVET.Animal.Dono'
      FixedChar = True
      Size = 50
    end
    object QryQualquerNomeCliente: TStringField
      FieldName = 'NomeCliente'
      FixedChar = True
      Size = 50
    end
    object QryQualquerEspecie: TStringField
      FieldName = 'Especie'
      FixedChar = True
    end
    object QryQualquerDataCadastro: TDateTimeField
      FieldName = 'DataCadastro'
      Origin = 'DNLABVET.Animal.DataCadastro'
    end
    object QryQualquerCor: TStringField
      FieldName = 'Cor'
      Origin = 'DNLABVET.Animal.Cor'
      FixedChar = True
      Size = 10
    end
    object QryQualquerNascimento: TDateTimeField
      FieldName = 'Nascimento'
      Origin = 'DNLABVET.Animal.Nascimento'
    end
    object QryQualquerAtivo: TStringField
      FieldName = 'Ativo'
      Origin = 'DNLABVET.Animal.Ativo'
      FixedChar = True
      Size = 1
    end
    object QryQualquerRaca: TStringField
      FieldName = 'Raca'
      Origin = 'DNLABVET.Animal.Raca'
      FixedChar = True
    end
    object QryQualquerCodEspecie: TIntegerField
      FieldName = 'CodEspecie'
      Origin = 'DNLABVET.Animal.CodEspecie'
    end
    object QryQualquerCodCliente: TIntegerField
      FieldName = 'CodCliente'
      Origin = 'DNLABVET.Animal.CodCliente'
    end
    object QryQualquerCodAnimal: TAutoIncField
      FieldName = 'CodAnimal'
      Origin = 'DNLABVET.Animal.CodAnimal'
    end
  end
  object UDPQualquer: TUpdateSQL
    ModifySQL.Strings = (
      'update Animal'
      'set'
      '  CodCliente = :CodCliente,'
      '  CodEspecie = :CodEspecie,'
      '  Nome = :Nome,'
      '  Cor = :Cor,'
      '  Dono = :Dono,'
      '  DataCadastro = :DataCadastro,'
      '  Nascimento = :Nascimento,'
      '  Ativo = :Ativo,'
      '  Raca = :Raca'
      'where'
      '  CodAnimal = :OLD_CodAnimal')
    InsertSQL.Strings = (
      'insert into Animal'
      
        '  (CodCliente, CodEspecie, Nome, Cor, Dono, DataCadastro, Nascim' +
        'ento, Ativo, '
      '   Raca)'
      'values'
      
        '  (:CodCliente, :CodEspecie, :Nome, :Cor, :Dono, :DataCadastro, ' +
        ':Nascimento, '
      '   :Ativo, :Raca)')
    DeleteSQL.Strings = (
      'delete from Animal'
      'where'
      '  CodAnimal = :OLD_CodAnimal')
    Left = 389
    Top = 165
  end
  object DSQualquer: TDataSource
    AutoEdit = False
    DataSet = QryQualquer
    Left = 421
    Top = 125
  end
  object QryCliente: TQuery
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Cliente'
      'Order by Nome')
    Left = 349
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
    Left = 389
    Top = 234
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
end
