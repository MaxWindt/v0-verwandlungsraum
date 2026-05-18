if (-not (Test-Path .env.local)) {
  Write-Error "File .env.local was not found. Please create it with required Sanity credentials."
  exit 1
}

$tokenLine = Get-Content .env.local | Select-String "^SANITY_WRITE_TOKEN=" | Select-Object -First 1
$tokenMatch = if ($tokenLine) { [regex]::Match($tokenLine.ToString(), '^SANITY_WRITE_TOKEN=["'']?([^"''\s#]+)["'']?') } else { $null }
$token = if ($tokenMatch -and $tokenMatch.Success) { $tokenMatch.Groups[1].Value.Trim() } else { "" }
if ([string]::IsNullOrWhiteSpace($token)) {
  Write-Error "SANITY_WRITE_TOKEN is missing in .env.local"
  exit 1
}
$headers = @{ "Authorization" = "Bearer $token"; "Content-Type" = "application/json" }
$baseUrl = "https://y7ytd6po.api.sanity.io/v2025-01-01/data/mutate/production"

# Patch simple fields
$patch = @{
  mutations = @(
    @{
      patch = @{
        id = "f0039819-f95a-45fc-bb79-31418cba52dd"
        set = @{
          shortDescription = "Aus deiner Mitte heraus Grenzen setzen"
          dates            = @("Samstag, 30. Mai, 14:30-18:30 Uhr")
          location         = "Lebensraum, Spechthausen"
          price            = "35-50 EUR"
          dialogType       = "details"
          hidden           = $false
        }
      }
    }
  )
}

$body = $patch | ConvertTo-Json -Depth 10
$resp = Invoke-RestMethod -Uri $baseUrl -Method POST -Headers $headers -Body $body
Write-Host "Patch result: $($resp | ConvertTo-Json -Depth 5)"

# Portable Text for dialogContent
$dialogContent = @(
  @{
    _type = "block"
    _key  = "block1"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span1"; text = "Wann bist du ganz bei dir?"; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block2"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span2"; text = "Wie fuehlt es sich an, deinen Koerper liebevoll von innen auszufuellen und bewusst zu bewohnen?"; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block3"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span3"; text = ""; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block4"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span4"; text = "Unsere Erfahrung ist, dass es sich aus dieser Mitte leichter lebt und wir bei Bedarf Grenzen klarer setzen koennen."; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block5"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span5"; text = ""; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block6"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span6"; text = "Aus der Erdung in dir selbst heraus moechten wir dich dabei unterstuetzen, deine Grenzen klar und mit Leichtigkeit zu spueren und stimmig zu kommunizieren."; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block7"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span7"; text = ""; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block8"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span8"; text = "Mit dem verbundenen Atem atmest du dich in deine Mitte. Mit achtsamem Malen kannst du diese Erfahrung visualisieren und als sichtbare Erinnerung mit nach Hause nehmen."; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block9"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span9"; text = ""; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block10"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span10"; text = "Wir freuen uns auf dich!"; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block11"
    style = "normal"
    children = @(@{ _type = "span"; _key = "span11"; text = ""; marks = @() })
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block12"
    style = "normal"
    children = @(
      @{ _type = "span"; _key = "spanb1"; text = "Rebecca Schwindt"; marks = @("strong") },
      @{ _type = "span"; _key = "spanb2"; text = " - HP Psychotherapie, Kunsttherapeutin, B.Sc Psychologie"; marks = @() }
    )
    markDefs = @()
  },
  @{
    _type = "block"
    _key  = "block13"
    style = "normal"
    children = @(
      @{ _type = "span"; _key = "spanc1"; text = "Rebecca Schwegel"; marks = @("strong") },
      @{ _type = "span"; _key = "spanc2"; text = " - Begleiterin fuer Atemarbeit, B.Sc Psychologie"; marks = @() }
    )
    markDefs = @()
  }
)

$contentPatch = @{
  mutations = @(
    @{
      patch = @{
        id  = "f0039819-f95a-45fc-bb79-31418cba52dd"
        set = @{
          dialogContent = $dialogContent
        }
      }
    }
  )
}

$contentBody = $contentPatch | ConvertTo-Json -Depth 15
$resp2 = Invoke-RestMethod -Uri $baseUrl -Method POST -Headers $headers -Body $contentBody
Write-Host "Content patch result: $($resp2 | ConvertTo-Json -Depth 5)"
