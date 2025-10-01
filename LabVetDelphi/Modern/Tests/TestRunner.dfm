object frmTestRunner: TfrmTestRunner
  Left = 0
  Top = 0
  Caption = 'LabVet - Executor de Testes de Migra'#231#227'o'
  ClientHeight = 600
  ClientWidth = 1000
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'Tahoma'
  Font.Style = []
  OldCreateOrder = False
  Position = poScreenCenter
  OnCreate = FormCreate
  OnDestroy = FormDestroy
  PixelsPerInch = 96
  TextHeight = 13
  object splitter: TSplitter
    Left = 0
    Top = 350
    Width = 1000
    Height = 3
    Cursor = crVSplit
    Align = alTop
    ExplicitTop = 300
    ExplicitWidth = 185
  end
  object pnlTop: TPanel
    Left = 0
    Top = 0
    Width = 1000
    Height = 80
    Align = alTop
    BevelOuter = bvNone
    TabOrder = 0
    object lblStatus: TLabel
      Left = 16
      Top = 56
      Width = 31
      Height = 13
      Caption = 'Pronto'
    end
    object btnRunAll: TButton
      Left = 16
      Top = 16
      Width = 100
      Height = 25
      Caption = 'Executar Todos'
      TabOrder = 0
      OnClick = btnRunAllClick
    end
    object btnRunMigration: TButton
      Left = 122
      Top = 16
      Width = 100
      Height = 25
      Caption = 'Migra'#231#227'o'
      TabOrder = 1
      OnClick = btnRunMigrationClick
    end
    object btnRunUnit: TButton
      Left = 228
      Top = 16
      Width = 100
      Height = 25
      Caption = 'Unit'#225'rios'
      TabOrder = 2
      OnClick = btnRunUnitClick
    end
    object btnRunIntegration: TButton
      Left = 334
      Top = 16
      Width = 100
      Height = 25
      Caption = 'Integra'#231#227'o'
      TabOrder = 3
      OnClick = btnRunIntegrationClick
    end
    object btnRunPerformance: TButton
      Left = 440
      Top = 16
      Width = 100
      Height = 25
      Caption = 'Performance'
      TabOrder = 4
      OnClick = btnRunPerformanceClick
    end
    object btnGenerateReport: TButton
      Left = 560
      Top = 16
      Width = 100
      Height = 25
      Caption = 'Gerar Relat'#243'rio'
      TabOrder = 5
      OnClick = btnGenerateReportClick
    end
    object btnClearResults: TButton
      Left = 666
      Top = 16
      Width = 100
      Height = 25
      Caption = 'Limpar'
      TabOrder = 6
      OnClick = btnClearResultsClick
    end
    object progressBar: TProgressBar
      Left = 200
      Top = 56
      Width = 600
      Height = 17
      TabOrder = 7
    end
  end
  object pnlCenter: TPanel
    Left = 0
    Top = 80
    Width = 1000
    Height = 270
    Align = alTop
    BevelOuter = bvNone
    Caption = 'pnlCenter'
    TabOrder = 1
    object lvResults: TListView
      Left = 0
      Top = 0
      Width = 1000
      Height = 270
      Align = alClient
      Columns = <>
      FullDrag = True
      GridLines = True
      ReadOnly = True
      RowSelect = True
      TabOrder = 0
      ViewStyle = vsReport
      OnDblClick = lvResultsDblClick
    end
  end
  object pnlBottom: TPanel
    Left = 0
    Top = 353
    Width = 1000
    Height = 247
    Align = alClient
    BevelOuter = bvNone
    Caption = 'pnlBottom'
    TabOrder = 2
    object memoLog: TMemo
      Left = 0
      Top = 0
      Width = 1000
      Height = 247
      Align = alClient
      Font.Charset = DEFAULT_CHARSET
      Font.Color = clWindowText
      Font.Height = -11
      Font.Name = 'Courier New'
      Font.Style = []
      ParentFont = False
      ReadOnly = True
      ScrollBars = ssBoth
      TabOrder = 0
    end
  end
end