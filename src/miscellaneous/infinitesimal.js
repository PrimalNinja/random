// Complete Infinitesimal Class and Test Harness
// Paste into cyborgshell.com and run it

// ====================================================
// INFINITESIMAL CLASS
// ====================================================

function Infinitesimal(args_a)
{
	var m_objBase = null;
	var m_intOffset = 0;
	var m_strMagnitude = '';
	
	function initialise()
	{
		if (typeof args_a === 'number')
		{
			m_objBase = args_a;
			m_intOffset = 0;
			m_strMagnitude = '';
		}
		else if (typeof args_a === 'string')
		{
			parseString(args_a);
		}
		else if (args_a instanceof Infinitesimal)
		{
			m_objBase = args_a.getBase();
			m_intOffset = args_a.getOffset();
			m_strMagnitude = args_a.getMagnitude();
		}
		else if (args_a !== undefined)
		{
			m_objBase = args_a.base || 0;
			m_intOffset = args_a.offset || 0;
			m_strMagnitude = args_a.magnitude || '';
		}
		else
		{
			m_objBase = 0;
			m_intOffset = 0;
			m_strMagnitude = '';
		}
	}
	
	function parseString(strValue_a)
	{
		var strValue = '';
		var intPos = 0;
		
		strValue = strValue_a.toString();
		intPos = strValue.indexOf('...');
		
		if (intPos > -1)
		{
			m_objBase = parseFloat(strValue.substring(0, intPos));
			m_intOffset = 1;
			m_strMagnitude = strValue.substring(intPos + 3);
		}
		else
		{
			intPos = strValue.indexOf('.-.');
			
			if (intPos > -1)
			{
				m_objBase = parseFloat(strValue.substring(0, intPos));
				m_intOffset = -1;
				m_strMagnitude = strValue.substring(intPos + 3);
			}
			else
			{
				m_objBase = parseFloat(strValue);
				m_intOffset = 0;
				m_strMagnitude = '';
			}
		}
	}
	
	this.getBase = function()
	{
		return m_objBase;
	};
	
	this.getOffset = function()
	{
		return m_intOffset;
	};
	
	this.getMagnitude = function()
	{
		return m_strMagnitude;
	};
	
	this.setBase = function(objValue_a)
	{
		m_objBase = objValue_a;
	};
	
	this.setOffset = function(intValue_a)
	{
		m_intOffset = intValue_a;
	};
	
	this.setMagnitude = function(strValue_a)
	{
		m_strMagnitude = strValue_a;
	};
	
	this.clone = function()
	{
		return new Infinitesimal({
			base: m_objBase,
			offset: m_intOffset,
			magnitude: m_strMagnitude
		});
	};
	
	this.toString = function()
	{
		if (m_intOffset === 0)
		{
			return m_objBase.toString();
		}
		else if (m_intOffset === 1)
		{
			var strResult = m_objBase.toString() + '...';
			if (m_strMagnitude.length > 1)
			{
				strResult += m_strMagnitude.substring(0, 1) + '[' + (m_strMagnitude.length - 1) + ']';
			}
			else
			{
				strResult += m_strMagnitude;
			}
			return strResult;
		}
		else if (m_intOffset === -1)
		{
			var strResult = m_objBase.toString() + '.-.';
			if (m_strMagnitude.length > 1)
			{
				strResult += m_strMagnitude.substring(0, 1) + '[' + (m_strMagnitude.length - 1) + ']';
			}
			else
			{
				strResult += m_strMagnitude;
			}
			return strResult;
		}
		return '';
	};
	
	this.toNumber = function()
	{
		return m_objBase;
	};
	
	this.add = function(objOther_a)
	{
		var objResult = null;
		var objOther = objOther_a;
		var objBaseResult = 0;
		var intOffsetResult = 0;
		var strMagnitudeResult = '';
		var intElevationThis = 0;
		var intElevationOther = 0;
		var strNudgesThis = '';
		var strNudgesOther = '';
		var intElevationSum = 0;
		var intOffsetThis = 0;
		var intOffsetOther = 0;
		var strBase = '';
		var intDecimalPos = 0;
		var intDecimalPlaces = 0;
		var intScale = 0;
		var intScaled = 0;
		var strCombinedNudges = '';
		var intCombinedOffset = 0;
		
		objBaseResult = this.getBase() + objOther.getBase();
		intOffsetThis = this.getOffset();
		intOffsetOther = objOther.getOffset();
		
		if (intOffsetThis !== 0 && this.getMagnitude().length > 0)
		{
			intElevationThis = parseInt(this.getMagnitude().charAt(0), 10);
			strNudgesThis = this.getMagnitude().length > 1 ? this.getMagnitude().substring(1) : '';
		}
		
		if (intOffsetOther !== 0 && objOther.getMagnitude().length > 0)
		{
			intElevationOther = parseInt(objOther.getMagnitude().charAt(0), 10);
			strNudgesOther = objOther.getMagnitude().length > 1 ? objOther.getMagnitude().substring(1) : '';
		}
		
		if (intOffsetThis === 0 && intOffsetOther === 0)
		{
			intOffsetResult = 0;
			strMagnitudeResult = '';
		}
		else if (intOffsetThis === 0)
		{
			intOffsetResult = intOffsetOther;
			strMagnitudeResult = objOther.getMagnitude();
		}
		else if (intOffsetOther === 0)
		{
			intOffsetResult = intOffsetThis;
			strMagnitudeResult = this.getMagnitude();
		}
		else
		{
			if (intOffsetThis === 1)
			{
				intElevationSum = intElevationThis;
			}
			else
			{
				intElevationSum = -intElevationThis;
			}
			
			if (intOffsetOther === 1)
			{
				intElevationSum += intElevationOther;
			}
			else
			{
				intElevationSum += -intElevationOther;
			}
			
			if (intOffsetThis === intOffsetOther)
			{
				strCombinedNudges = strNudgesThis + strNudgesOther;
				intCombinedOffset = intOffsetThis;
			}
			else
			{
				if (strNudgesThis.length > strNudgesOther.length)
				{
					strCombinedNudges = strNudgesThis.slice(strNudgesOther.length);
					intCombinedOffset = intOffsetThis;
				}
				else if (strNudgesOther.length > strNudgesThis.length)
				{
					strCombinedNudges = strNudgesOther.slice(strNudgesThis.length);
					intCombinedOffset = intOffsetOther;
				}
				else
				{
					strCombinedNudges = '';
					intCombinedOffset = 0;
				}
			}
			
			if (intElevationSum > 9)
			{
				strBase = objBaseResult.toString();
				intDecimalPos = strBase.indexOf('.');
				
				if (intDecimalPos === -1)
				{
					intDecimalPlaces = 0;
				}
				else
				{
					intDecimalPlaces = strBase.length - intDecimalPos - 1;
				}
				
				intScale = Math.pow(10, intDecimalPlaces);
				intScaled = Math.round(objBaseResult * intScale) + 1;
				objBaseResult = intScaled / intScale;
				intElevationSum = intElevationSum - 10;
			}
			else if (intElevationSum < -9)
			{
				strBase = objBaseResult.toString();
				intDecimalPos = strBase.indexOf('.');
				
				if (intDecimalPos === -1)
				{
					intDecimalPlaces = 0;
				}
				else
				{
					intDecimalPlaces = strBase.length - intDecimalPos - 1;
				}
				
				intScale = Math.pow(10, intDecimalPlaces);
				intScaled = Math.round(objBaseResult * intScale) - 1;
				objBaseResult = intScaled / intScale;
				intElevationSum = intElevationSum + 10;
			}
			
			if (intElevationSum > 0)
			{
				intOffsetResult = 1;
			}
			else if (intElevationSum < 0)
			{
				intOffsetResult = -1;
				intElevationSum = -intElevationSum;
			}
			else
			{
				if (strCombinedNudges.length > 0)
				{
					intOffsetResult = intCombinedOffset;
					intElevationSum = 1;
				}
				else
				{
					intOffsetResult = 0;
				}
			}
			
			if (intOffsetResult !== 0)
			{
				strMagnitudeResult = intElevationSum.toString() + strCombinedNudges;
			}
			else
			{
				strMagnitudeResult = '';
			}
		}
		
		objResult = new Infinitesimal({
			base: objBaseResult,
			offset: intOffsetResult,
			magnitude: strMagnitudeResult
		});
		
		return objResult;
	};

	this.subtract = function(objOther_a)
	{
		var objNegated = new Infinitesimal({
			base: -objOther_a.getBase(),
			offset: -objOther_a.getOffset(),
			magnitude: objOther_a.getMagnitude()
		});
		
		return this.add(objNegated);
	};

	this.multiply = function(objOther_a)
	{
		var objResult = null;
		var objOther = objOther_a;
		var objBaseResult = 0;
		var intOffsetResult = 0;
		var strMagnitudeResult = '';
		var intElevationThis = 0;
		var intElevationOther = 0;
		var strNudgesThis = '';
		var strNudgesOther = '';
		var intElevationProduct = 0;
		var strBase = '';
		var intDecimalPos = 0;
		var intDecimalPlaces = 0;
		var intScale = 0;
		var intScaled = 0;
		
		objBaseResult = this.getBase() * objOther.getBase();
		
		if (this.getOffset() === 0 && objOther.getOffset() === 0)
		{
			intOffsetResult = 0;
			strMagnitudeResult = '';
		}
		else if (this.getOffset() === 0)
		{
			intOffsetResult = objOther.getOffset();
			strMagnitudeResult = objOther.getMagnitude();
		}
		else if (objOther.getOffset() === 0)
		{
			intOffsetResult = this.getOffset();
			strMagnitudeResult = this.getMagnitude();
		}
		else
		{
			if (this.getMagnitude().length > 0)
			{
				intElevationThis = parseInt(this.getMagnitude().charAt(0), 10);
				strNudgesThis = this.getMagnitude().length > 1 ? this.getMagnitude().substring(1) : '';
			}
			
			if (objOther.getMagnitude().length > 0)
			{
				intElevationOther = parseInt(objOther.getMagnitude().charAt(0), 10);
				strNudgesOther = objOther.getMagnitude().length > 1 ? objOther.getMagnitude().substring(1) : '';
			}
			
			if (this.getOffset() === objOther.getOffset())
			{
				intOffsetResult = 1;
			}
			else
			{
				intOffsetResult = -1;
			}
			
			intElevationProduct = intElevationThis * intElevationOther;
			
			while (intElevationProduct > 9)
			{
				strBase = objBaseResult.toString();
				intDecimalPos = strBase.indexOf('.');
				
				if (intDecimalPos === -1)
				{
					intDecimalPlaces = 0;
				}
				else
				{
					intDecimalPlaces = strBase.length - intDecimalPos - 1;
				}
				
				intScale = Math.pow(10, intDecimalPlaces);
				intScaled = Math.round(objBaseResult * intScale) + 1;
				objBaseResult = intScaled / intScale;
				intElevationProduct = intElevationProduct - 10;
			}
			
			var strCombinedNudges = strNudgesThis + strNudgesOther;
			
			if (intElevationProduct === 0 && strCombinedNudges.length === 0)
			{
				intOffsetResult = 0;
				strMagnitudeResult = '';
			}
			else if (intElevationProduct === 0 && strCombinedNudges.length > 0)
			{
				intElevationProduct = 1;
				strMagnitudeResult = intElevationProduct.toString() + strCombinedNudges;
			}
			else
			{
				strMagnitudeResult = intElevationProduct.toString() + strCombinedNudges;
			}
		}
		
		objResult = new Infinitesimal({
			base: objBaseResult,
			offset: intOffsetResult,
			magnitude: strMagnitudeResult
		});
		
		return objResult;
	};

	this.divide = function(objOther_a)
	{
		var objResult = null;
		var objOther = objOther_a;
		var objBaseResult = 0;
		var intOffsetResult = 0;
		var strMagnitudeResult = '';
		var intElevationThis = 0;
		var intElevationOther = 0;
		var strNudgesThis = '';
		var strNudgesOther = '';
		var intElevationQuotient = 0;
		var strBase = '';
		var intDecimalPos = 0;
		var intDecimalPlaces = 0;
		var intScale = 0;
		var intScaled = 0;
		
		objBaseResult = this.getBase() / objOther.getBase();
		
		if (this.getOffset() === 0 && objOther.getOffset() === 0)
		{
			intOffsetResult = 0;
			strMagnitudeResult = '';
		}
		else if (this.getOffset() === 0)
		{
			intOffsetResult = -objOther.getOffset();
			strMagnitudeResult = objOther.getMagnitude();
		}
		else if (objOther.getOffset() === 0)
		{
			intOffsetResult = this.getOffset();
			strMagnitudeResult = this.getMagnitude();
		}
		else
		{
			if (this.getMagnitude().length > 0)
			{
				intElevationThis = parseInt(this.getMagnitude().charAt(0), 10);
				strNudgesThis = this.getMagnitude().length > 1 ? this.getMagnitude().substring(1) : '';
			}
			
			if (objOther.getMagnitude().length > 0)
			{
				intElevationOther = parseInt(objOther.getMagnitude().charAt(0), 10);
				strNudgesOther = objOther.getMagnitude().length > 1 ? objOther.getMagnitude().substring(1) : '';
			}
			
			if (this.getOffset() === objOther.getOffset())
			{
				intOffsetResult = 1;
			}
			else
			{
				intOffsetResult = -1;
			}
			
			if (intElevationOther !== 0)
			{
				intElevationQuotient = Math.floor(intElevationThis / intElevationOther);
			}
			else
			{
				intElevationQuotient = intElevationThis;
			}
			
			var strCombinedNudges = '';
			
			if (strNudgesThis.length >= strNudgesOther.length)
			{
				strCombinedNudges = strNudgesThis.slice(strNudgesOther.length);
			}
			else
			{
				intOffsetResult = -intOffsetResult;
				strCombinedNudges = strNudgesOther.slice(strNudgesThis.length);
			}
			
			if (intElevationQuotient === 0 && strCombinedNudges.length === 0)
			{
				intOffsetResult = 0;
				strMagnitudeResult = '';
			}
			else if (intElevationQuotient === 0 && strCombinedNudges.length > 0)
			{
				intElevationQuotient = 1;
				strMagnitudeResult = intElevationQuotient.toString() + strCombinedNudges;
			}
			else
			{
				strMagnitudeResult = intElevationQuotient.toString() + strCombinedNudges;
			}
		}
		
		objResult = new Infinitesimal({
			base: objBaseResult,
			offset: intOffsetResult,
			magnitude: strMagnitudeResult
		});
		
		return objResult;
	};

	this.elevateUp = function()
	{
		var objResult = this.clone();
		
		if (objResult.getOffset() !== 0)
		{
			var strMag = objResult.getMagnitude();
			
			if (strMag.length === 0)
			{
				objResult.setMagnitude('1');
			}
			else
			{
				var strElevation = strMag.charAt(0);
				var intElevation = parseInt(strElevation, 10);
				var strNudges = strMag.length > 1 ? strMag.substring(1) : '';
				
				if (intElevation < 9)
				{
					objResult.setMagnitude((intElevation + 1).toString() + strNudges);
				}
				else
				{
					var strBase = objResult.getBase().toString();
					var intDecimalPos = strBase.indexOf('.');
					var intDecimalPlaces = 0;
					
					if (intDecimalPos !== -1)
					{
						intDecimalPlaces = strBase.length - intDecimalPos - 1;
					}
					
					var intScale = Math.pow(10, intDecimalPlaces);
					var intScaled = Math.round(objResult.getBase() * intScale) + 1;
					objResult.setBase(intScaled / intScale);
					objResult.setOffset(0);
					objResult.setMagnitude('');
				}
			}
		}
		
		return objResult;
	};

	this.elevateDown = function()
	{
		var objResult = this.clone();
		
		if (objResult.getOffset() !== 0)
		{
			var strMag = objResult.getMagnitude();
			
			if (strMag.length === 0)
			{
				objResult.setOffset(0);
			}
			else
			{
				var strElevation = strMag.charAt(0);
				var intElevation = parseInt(strElevation, 10);
				var strNudges = strMag.length > 1 ? strMag.substring(1) : '';
				
				if (intElevation > 1)
				{
					objResult.setMagnitude((intElevation - 1).toString() + strNudges);
				}
				else
				{
					objResult.setOffset(0);
					objResult.setMagnitude('');
				}
			}
		}
		
		return objResult;
	};

	this.setLevel = function(intNewLevel_a)
	{
		var strNewMag = '';
		
		for (var i = 0; i < intNewLevel_a; i++)
		{
			strNewMag += '1';
		}
		m_strMagnitude = strNewMag;
		
		if (intNewLevel_a === 0)
		{
			m_intOffset = 0;
		}
	};

	this.nudgePositive = function()
	{
		var objResult = this.clone();
		
		if (objResult.getOffset() === 0)
		{
			objResult.setOffset(1);
			objResult.setMagnitude('1');
		}
		else
		{
			objResult.setMagnitude(objResult.getMagnitude() + '1');
		}
		
		return objResult;
	};

	this.nudgeNegative = function()
	{
		var objResult = this.clone();
		
		if (objResult.getOffset() === 0)
		{
			objResult.setOffset(-1);
			objResult.setMagnitude('1');
		}
		else
		{
			objResult.setMagnitude(objResult.getMagnitude() + '1');
		}
		
		return objResult;
	};
	
	this.nudgeBack = function()
	{
		var objResult = this.clone();
		
		if (objResult.getOffset() !== 0)
		{
			var strMag = objResult.getMagnitude();
			if (strMag.length > 1)
			{
				objResult.setMagnitude(strMag.slice(0, -1));
			}
		}
		
		return objResult;
	};
	
	this.equal = function(objOther_a)
	{
		return (
			this.getBase() === objOther_a.getBase() &&
			this.getOffset() === objOther_a.getOffset() &&
			this.getMagnitude() === objOther_a.getMagnitude()
		);
	};
	
	this.lessThan = function(objOther_a)
	{
		if (this.getBase() < objOther_a.getBase())
		{
			return true;
		}
		if (this.getBase() > objOther_a.getBase())
		{
			return false;
		}
		
		if (this.getOffset() < objOther_a.getOffset())
		{
			return true;
		}
		if (this.getOffset() > objOther_a.getOffset())
		{
			return false;
		}
		
		if (this.getOffset() === 0)
		{
			return false;
		}
		
		var intElevationThis = 0;
		var intElevationOther = 0;
		var strNudgesThis = '';
		var strNudgesOther = '';
		
		if (this.getMagnitude().length > 0)
		{
			intElevationThis = parseInt(this.getMagnitude().charAt(0), 10);
			strNudgesThis = this.getMagnitude().length > 1 ? this.getMagnitude().substring(1) : '';
		}
		
		if (objOther_a.getMagnitude().length > 0)
		{
			intElevationOther = parseInt(objOther_a.getMagnitude().charAt(0), 10);
			strNudgesOther = objOther_a.getMagnitude().length > 1 ? objOther_a.getMagnitude().substring(1) : '';
		}
		
		if (this.getOffset() === 1)
		{
			if (intElevationThis < intElevationOther)
			{
				return true;
			}
			if (intElevationThis > intElevationOther)
			{
				return false;
			}
			
			return strNudgesThis.length < strNudgesOther.length;
		}
		else if (this.getOffset() === -1)
		{
			if (intElevationThis > intElevationOther)
			{
				return true;
			}
			if (intElevationThis < intElevationOther)
			{
				return false;
			}
			
			return strNudgesThis.length > strNudgesOther.length;
		}
		
		return false;
	};
	
	this.greaterThan = function(objOther_a)
	{
		return objOther_a.lessThan(this);
	};
	
	this.compare = function(objOther_a)
	{
		if (this.equal(objOther_a))
		{
			return 0;
		}
		if (this.lessThan(objOther_a))
		{
			return -1;
		}
		return 1;
	};
	
	initialise();
}

function ByteProbabilityArray()
{
    var m_arrProbabilities = [];
    var m_intIndex = 0;
    
    for (m_intIndex = 0; m_intIndex < 256; m_intIndex++)
    {
        m_arrProbabilities[m_intIndex] = new Infinitesimal(1/256);
    }
    
	this.nudgeByteUp = function(intByte_a)
	{
		m_arrProbabilities[intByte_a] = m_arrProbabilities[intByte_a].nudgePositive();
	};

	this.nudgeByteDown = function(intByte_a)
	{
		m_arrProbabilities[intByte_a] = m_arrProbabilities[intByte_a].nudgeNegative();
	};
    
    this.nudgeByteBack = function(intByte_a)
    {
        m_arrProbabilities[intByte_a] = m_arrProbabilities[intByte_a].nudgeBack();
    };
    
    this.getProbability = function(intByte_a)
    {
        return m_arrProbabilities[intByte_a];
    };
    
    this.setProbability = function(intByte_a, objValue_a)
    {
        m_arrProbabilities[intByte_a] = objValue_a;
    };

    this.getMostLikely = function()
    {
        var intBestIndex = 0;
        var intIndex = 0;
        
        for (intIndex = 1; intIndex < 256; intIndex++)
        {
            if (m_arrProbabilities[intIndex].greaterThan(m_arrProbabilities[intBestIndex]))
            {
                intBestIndex = intIndex;
            }
        }
        
        return intBestIndex;
    };
    
    this.getTopN = function(intCount_a)
    {
        var arrSorted = [];
        var intIndex = 0;
        var arrResult = [];
        
        for (intIndex = 0; intIndex < 256; intIndex++)
        {
            arrSorted.push({
                index: intIndex,
                prob: m_arrProbabilities[intIndex]
            });
        }
        
        arrSorted.sort(function(a, b) {
            return -a.prob.compare(b.prob);
        });
        
        for (intIndex = 0; intIndex < intCount_a; intIndex++)
        {
            arrResult.push(arrSorted[intIndex].index);
        }
        
        return arrResult;
    };
    
    this.toString = function()
    {
        var strResult = '';
        var intIndex = 0;
        
        for (intIndex = 0; intIndex < 256; intIndex++)
        {
            strResult = strResult + 
                intIndex.toString().padStart(3, ' ') + ': ' + 
                m_arrProbabilities[intIndex].toString() + '\n';
        }
        
        return strResult;
    };
}

function analyzeFrequencies(arrData_a)
{
    var objProb = new ByteProbabilityArray();
    var intIndex = 0;
    var intByte = 0;
    
    api.print('Initial: P(65) = ' + objProb.getProbability(65).toString());
    
    for (intIndex = 0; intIndex < arrData_a.length; intIndex++)
    {
        intByte = arrData_a[intIndex];
        objProb.nudgeByteUp(intByte);
        
        if ((intIndex + 1) % 100 === 0)
        {
            api.print('After ' + (intIndex + 1) + ' bytes:');
            api.print('  Top 3: ' + objProb.getTopN(3).join(', '));
        }
    }
    
    return objProb;
}

function differentialAnalysis(arrPlaintexts_a, arrCiphertexts_a)
{
    var objDiffProb = new ByteProbabilityArray();
    var intIndex = 0;
    var intDiff = 0;
    
    for (intIndex = 0; intIndex < arrPlaintexts_a.length; intIndex++)
    {
        intDiff = arrPlaintexts_a[intIndex] ^ arrCiphertexts_a[intIndex];
        objDiffProb.nudgeByteUp(intDiff);
    }
    
    objDiffProb.nudgeByteUp(0x80);
    
    return objDiffProb;
}

function bayesianUpdate(objPrior_a, arrEvidence_a)
{
    var objPosterior = new ByteProbabilityArray();
    var intIndex = 0;
    var intByte = 0;
    var objCurrent = null;
    
    for (intIndex = 0; intIndex < 256; intIndex++)
    {
        objCurrent = objPrior_a.getProbability(intIndex);
        objPosterior.setProbability(intIndex, objCurrent.clone());
    }
    
    for (intIndex = 0; intIndex < arrEvidence_a.length; intIndex++)
    {
        intByte = arrEvidence_a[intIndex];
        objPosterior.nudgeByteUp(intByte);
    }
    
    return objPosterior;
}

// Infinitesimal Test Harness

function runInfinitesimalTests()
{
    var objOne = null;
    var objOneDotOne = null;
    var objOneDotTwo = null;
    var objOneDotNine = null;
    var objTwo = null;
    var objResult = null;
    var blnTest = false;
    var intIndex = 0;
    
    api.print('====================================================');
    api.print('INFINITESIMAL TEST HARNESS');
    api.print('====================================================');
    api.print('');
    
    // Test 1: Construction
    api.print('--- TEST 1: CONSTRUCTION ---');
    
    objOne = new Infinitesimal(1);
    objOneDotOne = new Infinitesimal('1...1');
    objOneDotTwo = new Infinitesimal('1...2');
    objOneDotNine = new Infinitesimal('1...9');
    objTwo = new Infinitesimal(2);
    
    api.print('objOne = ' + objOne.toString());
    api.print('objOneDotOne = ' + objOneDotOne.toString());
    api.print('objOneDotTwo = ' + objOneDotTwo.toString());
    api.print('objOneDotNine = ' + objOneDotNine.toString());
    api.print('objTwo = ' + objTwo.toString());
    api.print('');
    
    // Test 2: Nudge Up
    api.print('--- TEST 2: NUDGE UP ---');
    
    objResult = objOne.nudgePositive();
    api.print('1.nudgePositive() = ' + objResult.toString());
    
    objResult = objOneDotOne.nudgePositive();
    api.print('1...1.nudgePositive() = ' + objResult.toString());
    
    var objOneDotEight = new Infinitesimal('1...8');
    objResult = objOneDotEight.nudgePositive();
    api.print('1...8.nudgePositive() = ' + objResult.toString());
    api.print('');
    
    // Test 3: Nudge Down
    api.print('--- TEST 3: NUDGE DOWN ---');
    
    objResult = objOne.nudgeNegative();
    api.print('1.nudgeNegative() = ' + objResult.toString());
    
    objResult = objOneDotOne.nudgeNegative();
    api.print('1...1.nudgeNegative() = ' + objResult.toString());
    
    objResult = objOneDotTwo.nudgeNegative();
    api.print('1...2.nudgeNegative() = ' + objResult.toString());
    api.print('');
    
    // Test 4: Nudge Back
    api.print('--- TEST 4: NUDGE BACK ---');
    
    objResult = objOne.nudgeBack();
    api.print('1.nudgeBack() = ' + objResult.toString());
    
    objResult = objOneDotOne.nudgeBack();
    api.print('1...1.nudgeBack() = ' + objResult.toString());
    
    objResult = new Infinitesimal('1...111');
    api.print('Start: ' + objResult.toString());
    objResult = objResult.nudgeBack();
    api.print('After nudgeBack: ' + objResult.toString());
    objResult = objResult.nudgeBack();
    api.print('After nudgeBack: ' + objResult.toString());
    api.print('');
    
    // Test 5: Elevate Up/Down
    api.print('--- TEST 5: ELEVATE ---');
    
    objResult = objOneDotOne.elevateUp();
    api.print('1...1.elevateUp() = ' + objResult.toString());
    
    objResult = objOneDotTwo.elevateUp();
    api.print('1...2.elevateUp() = ' + objResult.toString());
    
    objResult = objOneDotNine.elevateUp();
    api.print('1...9.elevateUp() = ' + objResult.toString());
    
    objResult = objOneDotTwo.elevateDown();
    api.print('1...2.elevateDown() = ' + objResult.toString());
    
    objResult = objOneDotOne.elevateDown();
    api.print('1...1.elevateDown() = ' + objResult.toString());
    api.print('');
    
    // Test 6: Addition
    api.print('--- TEST 6: ADDITION ---');
    
    objResult = objOne.add(objOne);
    api.print('1 + 1 = ' + objResult.toString());
    
    objResult = objOne.add(objOneDotOne);
    api.print('1 + 1...1 = ' + objResult.toString());
    
    objResult = objOneDotOne.add(objOneDotOne);
    api.print('1...1 + 1...1 = ' + objResult.toString());
    
    objResult = objOneDotOne.add(objOneDotTwo);
    api.print('1...1 + 1...2 = ' + objResult.toString());
    api.print('');
    
    // Test 7: Subtraction
    api.print('--- TEST 7: SUBTRACTION ---');
    
    objResult = objTwo.subtract(objOne);
    api.print('2 - 1 = ' + objResult.toString());
    
    objResult = objTwo.subtract(objOneDotOne);
    api.print('2 - 1...1 = ' + objResult.toString());
    
    objResult = objOneDotTwo.subtract(objOneDotOne);
    api.print('1...2 - 1...1 = ' + objResult.toString());
    api.print('');
    
    // Test 8: Multiplication
    api.print('--- TEST 8: MULTIPLICATION ---');
    
    objResult = objTwo.multiply(objTwo);
    api.print('2 * 2 = ' + objResult.toString());
    
    objResult = objOneDotOne.multiply(objOneDotOne);
    api.print('1...1 * 1...1 = ' + objResult.toString());
    
    objResult = objOneDotOne.multiply(objOneDotTwo);
    api.print('1...1 * 1...2 = ' + objResult.toString());
    api.print('');
    
    // Test 9: Division
    api.print('--- TEST 9: DIVISION ---');
    
    objResult = objTwo.divide(objOne);
    api.print('2 / 1 = ' + objResult.toString());
    
    objResult = objOne.divide(objOneDotOne);
    api.print('1 / 1...1 = ' + objResult.toString());
    
    objResult = objOneDotTwo.divide(objOneDotOne);
    api.print('1...2 / 1...1 = ' + objResult.toString());
    api.print('');
    
    // Test 10: Comparisons
    api.print('--- TEST 10: COMPARISONS ---');
    
    api.print('1 equal 1 = ' + objOne.equal(objOne));
    api.print('1 equal 1...1 = ' + objOne.equal(objOneDotOne));
    api.print('1 lessThan 1...1 = ' + objOne.lessThan(objOneDotOne));
    api.print('1...1 lessThan 1 = ' + objOneDotOne.lessThan(objOne));
    api.print('1 lessThan 2 = ' + objOne.lessThan(objTwo));
    api.print('1...1 lessThan 1...2 = ' + objOneDotOne.lessThan(objOneDotTwo));
    api.print('1...2 lessThan 1...1 = ' + objOneDotTwo.lessThan(objOneDotOne));
    api.print('1 greaterThan 1...1 = ' + objOne.greaterThan(objOneDotOne));
    api.print('1...1 greaterThan 1 = ' + objOneDotOne.greaterThan(objOne));
    api.print('');
    
    // Test 11: Chain Operations
    api.print('--- TEST 11: CHAIN OPERATIONS ---');
    
    objResult = objOne.nudgePositive().nudgePositive().nudgePositive();
    api.print('1.nudgePositive().nudgePositive().nudgePositive() = ' + objResult.toString());
    
    objResult = objOneDotOne.nudgePositive().nudgeBack();
    api.print('1...1.nudgePositive().nudgeBack() = ' + objResult.toString());
    api.print('');
    
    // Test 12: Racing Simulation
    api.print('--- TEST 12: RACING SIMULATION ---');
    
    var arrPositions = [];
    arrPositions.push(new Infinitesimal(1));
    arrPositions.push(new Infinitesimal('1...1'));
    arrPositions.push(new Infinitesimal('1...2'));
    arrPositions.push(new Infinitesimal(2));
    arrPositions.push(new Infinitesimal('2...1'));
    arrPositions.push(new Infinitesimal('2...2'));
    arrPositions.push(new Infinitesimal(3));
    
    var arrSorted = arrPositions.slice().sort(function(a, b) {
        return a.compare(b);
    });
    
    api.print('Sorted positions:');
    for (intIndex = 0; intIndex < arrSorted.length; intIndex++)
    {
        api.print('  ' + arrSorted[intIndex].toString());
    }
    api.print('');
    
    // Test 13: Progressive Nudging
    api.print('--- TEST 13: PROGRESSIVE NUDGING ---');
    
    objResult = new Infinitesimal(0);
    api.print('Starting at: ' + objResult.toString());
    
    for (intIndex = 1; intIndex <= 5; intIndex++)
    {
        objResult = objResult.nudgePositive();
        api.print('After nudgePositive ' + intIndex + ': ' + objResult.toString());
    }
    
    for (intIndex = 1; intIndex <= 3; intIndex++)
    {
        objResult = objResult.nudgeBack();
        api.print('After nudgeBack ' + intIndex + ': ' + objResult.toString());
    }
    api.print('');

    // Test 14: ByteProbabilityArray
	api.print('--- TEST 14: BYTE PROBABILITY ARRAY ---');

	var objProbArray = new ByteProbabilityArray();
	api.print('Initial P(65) = ' + objProbArray.getProbability(65).toString());

	objProbArray.nudgeByteUp(65);
	objProbArray.nudgeByteUp(65);
	objProbArray.nudgeByteUp(65);
	api.print('After 3 nudgePositive of 65, P(65) = ' + objProbArray.getProbability(65).toString());

	objProbArray.nudgeByteBack(65);
	api.print('After 1 nudgeBack of 65, P(65) = ' + objProbArray.getProbability(65).toString());

	api.print('Most likely byte = ' + objProbArray.getMostLikely());
	api.print('Top 3 bytes = ' + objProbArray.getTopN(3).join(', '));
	api.print('');
    
    // Test 15: Frequency Analysis
    api.print('--- TEST 15: FREQUENCY ANALYSIS ---');
    
    var arrEnglishSample = [];
    for (intIndex = 0; intIndex < 1000; intIndex++)
    {
        var intRand = Math.floor(Math.random() * 100);
        if (intRand < 12) { arrEnglishSample.push(69); }
        else if (intRand < 21) { arrEnglishSample.push(84); }
        else if (intRand < 29) { arrEnglishSample.push(65); }
        else if (intRand < 36) { arrEnglishSample.push(79); }
        else if (intRand < 43) { arrEnglishSample.push(73); }
        else if (intRand < 50) { arrEnglishSample.push(78); }
        else { arrEnglishSample.push(Math.floor(Math.random() * 256)); }
    }
    
    var objFreqAnalysis = analyzeFrequencies(arrEnglishSample);
    api.print('Final most likely byte = ' + objFreqAnalysis.getMostLikely());
    api.print('Final top 5 bytes = ' + objFreqAnalysis.getTopN(5).join(', '));
    api.print('');
    
	// Test 16: Differential Analysis
	api.print('--- TEST 16: DIFFERENTIAL ANALYSIS ---');

	var arrPlain = [];
	var arrCipher = [];

	for (intIndex = 0; intIndex < 500; intIndex++)
	{
		var intPlain = Math.floor(Math.random() * 256);
		var intCipher = 0;
		
		if (Math.random() < 0.3) { intCipher = intPlain ^ 0x80; }
		else { intCipher = intPlain ^ Math.floor(Math.random() * 256); }
		
		arrPlain.push(intPlain);
		arrCipher.push(intCipher);
	}

	var objDiffAnalysis = differentialAnalysis(arrPlain, arrCipher);
	api.print('Most likely XOR difference = ' + objDiffAnalysis.getMostLikely().toString(16));
	var arrTopDiffs = objDiffAnalysis.getTopN(3);
	for (intIndex = 0; intIndex < arrTopDiffs.length; intIndex++)
	{
		api.print('  ' + arrTopDiffs[intIndex].toString(16) + ' : ' + 
				  objDiffAnalysis.getProbability(arrTopDiffs[intIndex]).toString());
	}
	api.print('');
    
	// Test 17: Bayesian Update
	api.print('--- TEST 17: BAYESIAN UPDATE ---');

	var objPrior = new ByteProbabilityArray();

	var arrEvidence = [];
	for (intIndex = 0; intIndex < 10; intIndex++) { arrEvidence.push(65); }

	var objPosterior = bayesianUpdate(objPrior, arrEvidence);
	api.print('Posterior P(65) after 10 obs = ' + objPosterior.getProbability(65).toString());

	for (intIndex = 0; intIndex < 20; intIndex++) { arrEvidence.push(65); }

	objPosterior = bayesianUpdate(objPrior, arrEvidence);
	api.print('Posterior P(65) after 30 obs = ' + objPosterior.getProbability(65).toString());
	api.print('');

	// Test 18: Probability Comparison
	api.print('--- TEST 18: PROBABILITY COMPARISON ---');

	var objProbComp = new ByteProbabilityArray();

	objProbComp.nudgeByteUp(65);
	objProbComp.nudgeByteUp(65);
	objProbComp.nudgeByteUp(65);
	objProbComp.nudgeByteUp(84);
	objProbComp.nudgeByteUp(84);
	objProbComp.nudgeByteUp(79);

	api.print('P(65) = ' + objProbComp.getProbability(65).toString());
	api.print('P(84) = ' + objProbComp.getProbability(84).toString());
	api.print('P(79) = ' + objProbComp.getProbability(79).toString());
	api.print('P(65) > P(84)? ' + objProbComp.getProbability(65).greaterThan(objProbComp.getProbability(84)));
	api.print('P(84) > P(79)? ' + objProbComp.getProbability(84).greaterThan(objProbComp.getProbability(79)));
	api.print('Top 3: ' + objProbComp.getTopN(3).join(', '));
	api.print('');

	// Test 19: NudgePositive vs NudgeNegative direction
	api.print('--- TEST 19: NUDGE DIRECTION ---');

	var objRacingProbs = new ByteProbabilityArray();
	objRacingProbs.setProbability(65, new Infinitesimal(0.5));
	objRacingProbs.setProbability(84, new Infinitesimal(0.5));
	objRacingProbs.setProbability(79, new Infinitesimal(0.5));

	objRacingProbs.setProbability(65, objRacingProbs.getProbability(65).nudgePositive());
	objRacingProbs.setProbability(79, objRacingProbs.getProbability(79).nudgeNegative());

	api.print('P(65) = ' + objRacingProbs.getProbability(65).toString());
	api.print('P(84) = ' + objRacingProbs.getProbability(84).toString());
	api.print('P(79) = ' + objRacingProbs.getProbability(79).toString());

	var arrSortedProbs = [
		{byte: 65, prob: objRacingProbs.getProbability(65)},
		{byte: 84, prob: objRacingProbs.getProbability(84)},
		{byte: 79, prob: objRacingProbs.getProbability(79)}
	];
	arrSortedProbs.sort(function(a, b) { return -a.prob.compare(b.prob); });

	api.print('Sorted (highest first):');
	for (intIndex = 0; intIndex < arrSortedProbs.length; intIndex++)
	{
		api.print('  Byte ' + arrSortedProbs[intIndex].byte + 
				  ': ' + arrSortedProbs[intIndex].prob.toString());
	}
	api.print('');
   
	// Test 20: Pattern Signature Matching
	api.print('--- TEST 20: PATTERN SIGNATURE MATCHING ---');

	function buildPatternSignature(str_a)
	{
		var objSignature = {};
		var intLen = str_a.length;
		var intI = 0;
		var intJ = 0;
		var strKey = '';
		
		for (intI = 0; intI < intLen; intI++)
		{
			for (intJ = 0; intJ < intLen; intJ++)
			{
				if (intI === intJ) continue;
				
				strKey = str_a[intI] + ',' + str_a[intJ] + ',' + (intJ - intI);
				
				if (!objSignature[strKey])
				{
					objSignature[strKey] = new Infinitesimal(0);
				}
				objSignature[strKey] = objSignature[strKey].nudgePositive();
			}
		}
		
		return objSignature;
	}

	function comparePatternSignatures(objSig1_a, objSig2_a)
	{
		var objScore = new Infinitesimal(0);
		var intTotalRelations = 0;
		var strKey = '';
		var objCommon = {};
		
		for (strKey in objSig1_a) { intTotalRelations++; objCommon[strKey] = true; }
		for (strKey in objSig2_a) { if (!objCommon[strKey]) { intTotalRelations++; } }
		
		for (strKey in objSig1_a)
		{
			if (objSig2_a[strKey])
			{
				objScore = objScore.add(objSig1_a[strKey].multiply(objSig2_a[strKey]));
			}
		}
		
		if (intTotalRelations > 0)
		{
			objScore = objScore.divide(new Infinitesimal(intTotalRelations));
		}
		
		return objScore;
	}

	var arrTestStrings = ['ABC', 'ABE', 'CBA', 'XYZ', 'ABCD', 'ABCE'];
	var objSignatures = {};
	for (var s = 0; s < arrTestStrings.length; s++)
	{
		objSignatures[arrTestStrings[s]] = buildPatternSignature(arrTestStrings[s]);
	}

	var strTarget = 'ABC';
	api.print('Target: "' + strTarget + '"');
	var arrResults = [];
	for (var s = 0; s < arrTestStrings.length; s++)
	{
		var objScore = comparePatternSignatures(objSignatures[strTarget], objSignatures[arrTestStrings[s]]);
		arrResults.push({ string: arrTestStrings[s], score: objScore });
		api.print('  vs "' + arrTestStrings[s] + '": ' + objScore.toString());
	}
	arrResults.sort(function(a, b) { return -a.score.compare(b.score); });
	api.print('Sorted:');
	for (var r = 0; r < arrResults.length; r++)
	{
		api.print('  ' + arrResults[r].string + ' : ' + arrResults[r].score.toString());
	}
	api.print('');

	// Phrase matching
	var arrPhrases = ['hello world', 'hello word', 'hallo world', 'world hello', 'goodbye world'];
	var objPhraseSignatures = {};
	for (var p = 0; p < arrPhrases.length; p++)
	{
		objPhraseSignatures[arrPhrases[p]] = buildPatternSignature(arrPhrases[p]);
	}

	strTarget = 'hello world';
	api.print('Target: "' + strTarget + '"');
	var arrPhraseResults = [];
	for (var p = 0; p < arrPhrases.length; p++)
	{
		var objScore = comparePatternSignatures(objPhraseSignatures[strTarget], objPhraseSignatures[arrPhrases[p]]);
		arrPhraseResults.push({ phrase: arrPhrases[p], score: objScore });
		api.print('  vs "' + arrPhrases[p] + '": ' + objScore.toString());
	}
	arrPhraseResults.sort(function(a, b) { return -a.score.compare(b.score); });
	api.print('Sorted:');
	for (var r = 0; r < arrPhraseResults.length; r++)
	{
		api.print('  ' + arrPhraseResults[r].phrase + ' : ' + arrPhraseResults[r].score.toString());
	}
	api.print('');

    api.print('====================================================');
    api.print('TEST HARNESS COMPLETE');
    api.print('====================================================');
}

runInfinitesimalTests();