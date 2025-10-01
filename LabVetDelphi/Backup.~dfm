object FrmBackup: TFrmBackup
  Left = 323
  Top = 205
  Width = 357
  Height = 338
  Caption = 'Backup'
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  OnClose = FormClose
  PixelsPerInch = 96
  TextHeight = 13
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 341
    Height = 101
    Align = alTop
    TabOrder = 0
    object Memo1: TMemo
      Left = 8
      Top = 8
      Width = 317
      Height = 87
      Enabled = False
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -13
      Font.Name = 'MS Sans Serif'
      Font.Style = [fsBold]
      Lines.Strings = (
        'Backup ser'#225' realizado no diret'#243'rio '
        'c:\aguia\database\labvet o nome dele sera '
        'BK_LABVET+DiaSemana+Ano.Bak, '#233' '
        'fundamental fazer c'#243'pia desse arquivo para '
        'outro local.')
      ParentFont = False
      TabOrder = 0
    end
  end
  object Panel2: TPanel
    Left = 0
    Top = 101
    Width = 341
    Height = 142
    Align = alClient
    TabOrder = 1
    object Label1: TLabel
      Left = 7
      Top = 8
      Width = 96
      Height = 13
      Caption = 'Gera'#231#227'o do Backup'
    end
    object Label2: TLabel
      Left = 7
      Top = 43
      Width = 121
      Height = 13
      Caption = 'Compacta'#231#227'o do Backup'
    end
    object Label3: TLabel
      Left = 8
      Top = 75
      Width = 181
      Height = 16
      Caption = 'Enviando Email... Aguarde...'
      Font.Charset = ANSI_CHARSET
      Font.Color = clMaroon
      Font.Height = -13
      Font.Name = 'Arial'
      Font.Style = [fsBold]
      ParentFont = False
      Visible = False
    end
    object Gauge1: TGauge
      Left = 8
      Top = 90
      Width = 318
      Height = 24
      Progress = 0
      Visible = False
    end
    object ProgressBar1: TProgressBar
      Left = 7
      Top = 24
      Width = 321
      Height = 17
      TabOrder = 0
    end
    object ProgressBar2: TProgressBar
      Left = 7
      Top = 59
      Width = 321
      Height = 17
      TabOrder = 1
    end
  end
  object Panel3: TPanel
    Left = 0
    Top = 243
    Width = 341
    Height = 57
    Align = alBottom
    TabOrder = 2
    object BitBtn1: TBitBtn
      Left = 8
      Top = 8
      Width = 137
      Height = 41
      Caption = '&Backup'
      TabOrder = 0
      OnClick = BitBtn1Click
      Glyph.Data = {
        76020000424D7602000000000000760000002800000020000000200000000100
        0400000000000002000000000000000000001000000000000000000000000000
        8000008000000080800080000000800080008080000080808000C0C0C0000000
        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00FFFFFFFFFFFF
        FFFFFFFFF777000FFFFFFFFFFF0000000000000077888AA00FFFFFFFF7777700
        0007777708888AABB0FFFFFFF7F8887777088F8708888ABBEE0FFFFFF7F88870
        87088F8708888ABEE80FFFFFF7F8887087088F870F88FABE8880FFFFF7F88877
        7777788708F707E88880FFFFF7F888888888888708A0F0888880FFFFF7F88888
        888888870AE707888880FFFFF7F8FFFFFFFFFF870AEB88F88880FFFFF7F8FFFF
        FFFFFF870EBB888F880FFFFFF7F9FFFFFFFFFF870EBB8888F80FFFFFF7F99FFF
        FFFFFF870BBB8888800FFF99999999FFFFFFFF8707BB8880080FF9FFF7F99FFF
        FFFFFF0707777778880FF9FFF7F9FFFFFFFFFF8700000000880FF9FFFF777777
        777777778887FF70880FFF9FFFFF7F88070F870008770F70880FFFFFFFFF7F88
        00F0F7000870F070880F777777777F880007F70008800770880F7F8888887F88
        0000000000000000880F7F8AAA887F808888888888888888080F7F8222887F88
        8888888888888888880F7F8FFFFF7FFFFFFFFFFFFFFFFFFFFF0F7F8000007777
        7777777777777777770F7F8FFFFFFFFFFFFFFFFFFFF887770FFF7F8000000000
        00000000000887770FFF7F888888888888888888888887770FFF7FFFFFFFFFFF
        FFFFFFFFFFFFF7770FFFF7888888888888888888888888770FFFFF7888888888
        88888888888888870FFFFFF7777777777777777777777777FFFF}
    end
    object BbtnEmail: TBitBtn
      Left = 168
      Top = 8
      Width = 137
      Height = 41
      Caption = '&Envia para FTP'
      Enabled = False
      TabOrder = 1
      OnClick = BbtnEmailClick
      Glyph.Data = {
        76020000424D7602000000000000760000002800000020000000200000000100
        0400000000000002000000000000000000001000000000000000000000000000
        8000008000000080800080000000800080008080000080808000C0C0C0000000
        FF0000FF000000FFFF00FF000000FF00FF00FFFF0000FFFFFF00FFFFFFFFFFFF
        FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFF
        F00700FFFFFFFFFFFFFFFFFFFFFFFFFF00788000FFFFFFFFFFFFFFFFFFFFFFF0
        0F78888000FFFFFFFFFFFFFFFFFFFF00FF7888888000FFFFFFFFFFFFFFFFF00F
        FF788888888000FFFFFFFFFFFFFF00FFFF78888888888000FFFFFFFFFFF00FFF
        FF7888888888888000FFFFFFFF00FFFFFF778888877888888000FFFFF00FFFFF
        F78F77887F8788888880FFFF00FFFFFF78F8F887F8F878888880FFF00FFFFFF7
        8F8F8F8F8F8F78888880FF00FFFFFF78F8F8F8F888F887888880F00FFFFFF78F
        8F8F8F688F8F8F77888000FFFFFF78F8F8F8F66788F8F8FF77800FFFFFF78F8F
        8F8F66678F8F8FFFFF0F0FFFFF78F8F8F8F6666788F8FFFFF0FF0FFFF78F8F8F
        8F6666678F8FFFFF0FFF0FFF78F8F8F8F666666678FFFFF0FFFF0FF788888F8F
        86666666788FFF00FFFF0F78888888F8F66666666788F0F60FFF078888888888
        8F66666666780FF660FFF008888888888866666666660006660FFFF008888888
        88F66666666666666660FFFFF0088888888F6666666666666666FFFFFFF00888
        8888F66666666666666FFFFFFFFFF0088888FF808666666666FFFFFFFFFFFFF0
        0888FF0FFFFFFFF66FFFFFFFFFFFFFFFF008F0FFFFFFFFF6FFFFFFFFFFFFFFFF
        FFF00FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF}
    end
  end
  object SPBackup: TStoredProc
    DatabaseName = 'DNLABVET'
    StoredProcName = 'dbo.SP_BACKUP'
    Left = 160
    Top = 105
  end
  object IdSMTP1: TIdSMTP
    MaxLineAction = maException
    ReadTimeout = 0
    OnWork = IdSMTP1Work
    OnWorkBegin = IdSMTP1WorkBegin
    Host = 'mail.politampas.com.br'
    Port = 587
    AuthenticationType = atLogin
    Password = 'matrix18'
    Username = 'luciano.olgado@politampas.com.br'
    Left = 208
    Top = 112
  end
  object IdMessage1: TIdMessage
    AttachmentEncoding = 'MIME'
    BccList = <>
    CCList = <>
    Encoding = meMIME
    Recipients = <>
    ReplyTo = <>
    Left = 248
    Top = 112
  end
  object IdFTP1: TIdFTP
    MaxLineAction = maException
    ReadTimeout = 0
    OnWork = IdFTP1Work
    OnWorkBegin = IdFTP1WorkBegin
    Host = 'ftp.aguiasolutions.com.br'
    Password = 'M@trix1801'
    Username = 'backup'
    ProxySettings.ProxyType = fpcmNone
    ProxySettings.Port = 0
    Left = 96
    Top = 88
  end
end
