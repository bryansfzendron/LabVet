object DMLABVET: TDMLABVET
  OldCreateOrder = False
  Left = 517
  Top = 264
  Height = 281
  Width = 325
  object DBLABVET: TDatabase
    AliasName = 'LabVet_SQL'
    Connected = True
    DatabaseName = 'DNLABVET'
    LoginPrompt = False
    Params.Strings = (
      'UserName=sa'
      'PassWord=sapmsp06')
    SessionName = 'Default'
    Left = 32
    Top = 24
  end
  object QryEmpresa: TQuery
    CachedUpdates = True
    DatabaseName = 'DNLABVET'
    SQL.Strings = (
      'Select *'
      'From Empresa')
    UpdateObject = UPDEMpresa
    Left = 152
    Top = 16
    object QryEmpresaCodEmpresa: TAutoIncField
      FieldName = 'CodEmpresa'
      Origin = 'DNLABVET.Empresa.CodEmpresa'
    end
    object QryEmpresaEmpresa: TStringField
      FieldName = 'Empresa'
      Origin = 'DNLABVET.Empresa.Empresa'
      FixedChar = True
      Size = 50
    end
    object QryEmpresaFantasia: TStringField
      FieldName = 'Fantasia'
      Origin = 'DNLABVET.Empresa.Fantasia'
      FixedChar = True
      Size = 50
    end
    object QryEmpresaAbreviatura: TStringField
      FieldName = 'Abreviatura'
      Origin = 'DNLABVET.Empresa.Abreviatura'
      FixedChar = True
      Size = 5
    end
    object QryEmpresaEndereco: TStringField
      FieldName = 'Endereco'
      Origin = 'DNLABVET.Empresa.Endereco'
      FixedChar = True
      Size = 50
    end
    object QryEmpresaBairro: TStringField
      FieldName = 'Bairro'
      Origin = 'DNLABVET.Empresa.Bairro'
      FixedChar = True
      Size = 30
    end
    object QryEmpresaCidade: TStringField
      FieldName = 'Cidade'
      Origin = 'DNLABVET.Empresa.Cidade'
      FixedChar = True
      Size = 50
    end
    object QryEmpresaUF: TStringField
      FieldName = 'UF'
      Origin = 'DNLABVET.Empresa.UF'
      FixedChar = True
      Size = 2
    end
    object QryEmpresaCNPJ: TStringField
      FieldName = 'CNPJ'
      Origin = 'DNLABVET.Empresa.CNPJ'
      EditMask = '00.000.000/0000-00;0;_'
      FixedChar = True
      Size = 15
    end
    object QryEmpresaFone1: TStringField
      FieldName = 'Fone1'
      Origin = 'DNLABVET.Empresa.Fone1'
      EditMask = '!\(99\)0000-0000;1;_'
      FixedChar = True
      Size = 15
    end
    object QryEmpresaFone2: TStringField
      FieldName = 'Fone2'
      Origin = 'DNLABVET.Empresa.Fone2'
      EditMask = '!\(99\)0000-0000;1;_'
      FixedChar = True
      Size = 15
    end
    object QryEmpresaImagem: TBlobField
      FieldName = 'Imagem'
      Origin = 'DNLABVET.Empresa.Imagem'
    end
    object QryEmpresaData: TDateTimeField
      FieldName = 'Data'
      Origin = 'DNLABVET.Empresa.Data'
    end
    object QryEmpresaversao: TStringField
      FieldName = 'versao'
      Origin = 'DNLABVET.Empresa.versao'
      FixedChar = True
      Size = 10
    end
    object QryEmpresapop3: TStringField
      FieldName = 'pop3'
      Origin = 'DNLABVET.Empresa.pop3'
      FixedChar = True
      Size = 200
    end
    object QryEmpresasmtp: TStringField
      FieldName = 'smtp'
      Origin = 'DNLABVET.Empresa.smtp'
      FixedChar = True
      Size = 200
    end
    object QryEmpresaemail: TStringField
      FieldName = 'email'
      Origin = 'DNLABVET.Empresa.email'
      FixedChar = True
      Size = 200
    end
    object QryEmpresasenha: TStringField
      FieldName = 'senha'
      Origin = 'DNLABVET.Empresa.senha'
      FixedChar = True
      Size = 40
    end
    object QryEmpresaCEP: TStringField
      FieldName = 'CEP'
      Origin = 'DNLABVET.Empresa.CEP'
      EditMask = '00000\-999;1;_'
      FixedChar = True
      Size = 9
    end
    object QryEmpresasite: TStringField
      FieldName = 'site'
      Origin = 'DNLABVET.Empresa.site'
      FixedChar = True
      Size = 100
    end
  end
  object UPDEMpresa: TUpdateSQL
    ModifySQL.Strings = (
      'update Empresa'
      'set'
      '  Empresa = :Empresa,'
      '  Fantasia = :Fantasia,'
      '  Abreviatura = :Abreviatura,'
      '  Endereco = :Endereco,'
      '  Bairro = :Bairro,'
      '  Cidade = :Cidade,'
      '  UF = :UF,'
      '  CEP = :CEP,'
      '  CNPJ = :CNPJ,'
      '  Fone1 = :Fone1,'
      '  Fone2 = :Fone2,'
      '  Imagem = :Imagem,'
      '  Data = :Data,'
      '  versao = :versao,'
      '  pop3 = :pop3,'
      '  smtp = :smtp,'
      '  email = :email,'
      '  senha = :senha,'
      '  site = :site'
      'where'
      '  CodEmpresa = :OLD_CodEmpresa')
    InsertSQL.Strings = (
      'insert into Empresa'
      
        '  (Empresa, Fantasia, Abreviatura, Endereco, Bairro, Cidade, UF,' +
        ' CEP, CNPJ, '
      
        '   Fone1, Fone2, Imagem, Data, versao, pop3, smtp, email, senha,' +
        ' site)'
      'values'
      
        '  (:Empresa, :Fantasia, :Abreviatura, :Endereco, :Bairro, :Cidad' +
        'e, :UF, '
      
        '   :CEP, :CNPJ, :Fone1, :Fone2, :Imagem, :Data, :versao, :pop3, ' +
        ':smtp, '
      '   :email, :senha, :site)')
    DeleteSQL.Strings = (
      'delete from Empresa'
      'where'
      '  CodEmpresa = :OLD_CodEmpresa')
    Left = 192
    Top = 72
  end
  object DSEmpresa: TDataSource
    AutoEdit = False
    DataSet = QryEmpresa
    Left = 224
    Top = 24
  end
end
