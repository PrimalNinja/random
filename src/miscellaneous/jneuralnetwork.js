// Complete JNeuralNetwork with Infinitesimal Integration and Test Harness
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

// ====================================================
// IMPROVED JNEURALNETWORK WITH INFINITESIMAL SUPPORT
// ====================================================

// ====================================================
// IMPROVED JNEURALNETWORK WITH INFINITESIMAL SUPPORT
// ====================================================

function JNeuralNetwork() 
{
	// Internal data structure to store training data and property weights
	var m_arrTrainingData = [];
	var m_objDataCountMap = {}; // Map to track data counts
	var m_objPropertyWeights = {};
	var m_objSimilarityCallbacks = {}; // Custom similarity functions per property

	// Public method to initialize the neural network
	this.initialise = function () 
	{
		m_arrTrainingData = [];
		m_objDataCountMap = {};
		m_objPropertyWeights = {};
		m_objSimilarityCallbacks = {};
	};

	// Public method to register a similarity callback for a property
	this.registerSimilarity = function(strPropName_a, fnCallback_a) 
	{
		m_objSimilarityCallbacks[strPropName_a] = fnCallback_a;
	};

	// Public method to train the neural network with provided data
	this.train = function (arrData_a) 
	{
		if (Array.isArray(arrData_a)) 
		{
			var intIndex = 0;
			var objItem = null;
			var strDataKey = '';
			
			for (intIndex = 0; intIndex < arrData_a.length; intIndex++) 
			{
				objItem = arrData_a[intIndex];
				strDataKey = JSON.stringify(objItem);
				
				if (!m_objDataCountMap[strDataKey]) 
				{
					m_objDataCountMap[strDataKey] = 0;
					m_arrTrainingData.push(objItem); // Add the unique item to trainingData
				}
				m_objDataCountMap[strDataKey]++;

				// Update property weights for this data item
				updatePropertyWeights(objItem);
			}
		}
	};

	// Public method to get both training data and property weights
	this.getData = function () 
	{
		return { 
			trainingData: m_arrTrainingData, 
			propertyWeights: m_objPropertyWeights,
			similarityCallbacks: m_objSimilarityCallbacks
		};
	};

	// Public method to set both training data and property weights
	this.setData = function (objData_a) 
	{
		if (objData_a && objData_a.trainingData && objData_a.propertyWeights) 
		{
			m_arrTrainingData = objData_a.trainingData;
			m_objPropertyWeights = objData_a.propertyWeights;
			if (objData_a.similarityCallbacks) 
			{
				m_objSimilarityCallbacks = objData_a.similarityCallbacks;
			}
		}
	};

	// Calculate property weights for a single item
	function updatePropertyWeights(objItem_a) 
	{
		var strProp = '';
		var objValue = null;
		
		for (strProp in objItem_a) 
		{
			if (objItem_a.hasOwnProperty(strProp)) 
			{
				if (!m_objPropertyWeights[strProp]) 
				{
					m_objPropertyWeights[strProp] = {};
				}
				objValue = objItem_a[strProp];
				
				// Use Infinitesimal for weights to capture frequency and confidence
				if (!m_objPropertyWeights[strProp][objValue]) 
				{
					m_objPropertyWeights[strProp][objValue] = new Infinitesimal(0);
				}
				m_objPropertyWeights[strProp][objValue] = m_objPropertyWeights[strProp][objValue].nudgePositive();
			}
		}
	}

	// Public method to query the neural network with infinitesimal precision
	this.query = function (objProperties_a, objOptions_a) 
	{
		var objResult = null;
		var objOptions = objOptions_a || {};
		var blnUseInfinitesimals = objOptions.useInfinitesimals !== false; // Default to true
		var objThreshold = objOptions.threshold ? new Infinitesimal(objOptions.threshold) : null;
		
		if (objProperties_a !== null && objProperties_a !== undefined && typeof objProperties_a === 'object') 
		{
			var arrBestMatches = [];
			var objBestMatchScore = blnUseInfinitesimals ? new Infinitesimal(0) : 0;
			var intIndex = 0;
			var objItem = null;

			for (intIndex = 0; intIndex < m_arrTrainingData.length; intIndex++) 
			{
				objItem = m_arrTrainingData[intIndex];
				
				var objMatchScore = blnUseInfinitesimals ? new Infinitesimal(0) : 0;
				var intTotalProperties = 0;
				var strProp = '';

				for (strProp in objProperties_a) 
				{
					if (objProperties_a.hasOwnProperty(strProp) && objItem.hasOwnProperty(strProp)) 
					{
						var objSimilarity = null;
						
						if (m_objSimilarityCallbacks[strProp]) 
						{
							// Use custom similarity callback
							var objCallbackResult = m_objSimilarityCallbacks[strProp](
								objProperties_a[strProp], 
								objItem[strProp],
								m_objPropertyWeights[strProp] ? m_objPropertyWeights[strProp][objItem[strProp]] : new Infinitesimal(1)
							);
							
							if (blnUseInfinitesimals) 
							{
								objSimilarity = objCallbackResult instanceof Infinitesimal ? 
									objCallbackResult : new Infinitesimal(objCallbackResult);
							} 
							else 
							{
								objSimilarity = objCallbackResult;
							}
						} 
						else 
						{
							// Default exact match logic
							var blnIsMatch = false;
							if (objProperties_a[strProp] instanceof RegExp) 
							{
								blnIsMatch = objProperties_a[strProp].test(objItem[strProp]);
							} 
							else 
							{
								blnIsMatch = objProperties_a[strProp] === objItem[strProp];
							}
							
							if (blnUseInfinitesimals) 
							{
								var objWeight = m_objPropertyWeights[strProp] && m_objPropertyWeights[strProp][objItem[strProp]] ? 
									m_objPropertyWeights[strProp][objItem[strProp]] : new Infinitesimal(1);
								
								if (blnIsMatch) 
								{
									// Create similarity that preserves the weight's magnitude
									objSimilarity = new Infinitesimal({
										base: 1,
										offset: objWeight.getOffset(),
										magnitude: objWeight.getMagnitude()
									});
								}
								else
								{
									objSimilarity = new Infinitesimal(0);
								}
							} 
							else 
							{
								objSimilarity = blnIsMatch ? 1 : 0;
							}
						}
						
						if (blnUseInfinitesimals) 
						{
							objMatchScore = objMatchScore.add(objSimilarity);
						} 
						else 
						{
							objMatchScore += objSimilarity;
						}
						intTotalProperties++;
					}
				}

				// Normalize by total properties
				if (intTotalProperties > 0) 
				{
					if (blnUseInfinitesimals) 
					{
						objMatchScore = objMatchScore.divide(new Infinitesimal(intTotalProperties));
					} 
					else 
					{
						objMatchScore = (objMatchScore / intTotalProperties) * 100;
					}
				}

				// Compare using appropriate method
				if (blnUseInfinitesimals) 
				{
					if (objMatchScore.greaterThan(objBestMatchScore)) 
					{
						objBestMatchScore = objMatchScore;
						arrBestMatches = [objItem];
					} 
					else if (objMatchScore.equal(objBestMatchScore)) 
					{
						arrBestMatches.push(objItem);
					}
				} 
				else 
				{
					if (objMatchScore > objBestMatchScore) 
					{
						objBestMatchScore = objMatchScore;
						arrBestMatches = [objItem];
					} 
					else if (objMatchScore === objBestMatchScore) 
					{
						arrBestMatches.push(objItem);
					}
				}
			}

			if (arrBestMatches.length > 0) 
			{
				// Sort bestMatches based on total property weightings
				arrBestMatches.sort(function (a, b) 
				{
					var objAWeight = calculateTotalWeight(a, blnUseInfinitesimals);
					var objBWeight = calculateTotalWeight(b, blnUseInfinitesimals);
					
					if (blnUseInfinitesimals) 
					{
						return -objAWeight.compare(objBWeight);
					} 
					else 
					{
						return objBWeight - objAWeight;
					}
				});

				// Apply threshold if specified
				var arrResults = arrBestMatches;
				if (objThreshold && blnUseInfinitesimals) 
				{
					arrResults = [];
					var intMatchIndex = 0;
					
					for (intMatchIndex = 0; intMatchIndex < arrBestMatches.length; intMatchIndex++) 
					{
						// Compare the confidence score, not the item weight
						if (objBestMatchScore.greaterThan(objThreshold)) 
						{
							arrResults.push(arrBestMatches[intMatchIndex]);
						}
					}
				}

				objResult = {
					confidence: objBestMatchScore,
					result: arrResults[0],
					allMatches: arrResults,
					matchCount: arrResults.length
				};
			}
		}

		return objResult;
	};

	// Calculate the total property weightings for a given record
	function calculateTotalWeight(objRecord_a, blnUseInfinitesimals_a) 
	{
		var blnUseInfinitesimals = blnUseInfinitesimals_a !== false;
		var objTotalWeight = blnUseInfinitesimals ? new Infinitesimal(0) : 0;
		var strProp = '';
		
		for (strProp in objRecord_a) 
		{
			if (objRecord_a.hasOwnProperty(strProp) && 
				m_objPropertyWeights[strProp] && 
				m_objPropertyWeights[strProp][objRecord_a[strProp]]) 
			{
				
				if (blnUseInfinitesimals) 
				{
					objTotalWeight = objTotalWeight.add(m_objPropertyWeights[strProp][objRecord_a[strProp]]);
				} 
				else 
				{
					objTotalWeight += m_objPropertyWeights[strProp][objRecord_a[strProp]].toNumber();
				}
			}
		}
		return objTotalWeight;
	}

	// Public method: Get property statistics with infinitesimal precision
	this.getPropertyStats = function(strPropName_a) 
	{
		if (!m_objPropertyWeights[strPropName_a]) 
		{
			return null;
		}
		
		var objStats = {
			values: [],
			totalCount: new Infinitesimal(0)
		};
		var strValue = '';
		
		for (strValue in m_objPropertyWeights[strPropName_a]) 
		{
			objStats.values.push({
				value: strValue,
				weight: m_objPropertyWeights[strPropName_a][strValue]
			});
			objStats.totalCount = objStats.totalCount.add(m_objPropertyWeights[strPropName_a][strValue]);
		}
		
		// Sort by weight descending
		objStats.values.sort(function(a, b) 
		{
			return -a.weight.compare(b.weight);
		});
		
		return objStats;
	};

	// Public method: Get network statistics
	this.getStats = function() 
	{
		var intTotalInstances = 0;
		var strKey = '';
		
		for (strKey in m_objDataCountMap) 
		{
			intTotalInstances += m_objDataCountMap[strKey];
		}
		
		return {
			uniqueTrainingRecords: m_arrTrainingData.length,
			totalTrainingInstances: intTotalInstances,
			propertyCount: Object.keys(m_objPropertyWeights).length,
			registeredCallbacks: Object.keys(m_objSimilarityCallbacks).length
		};
	};
}

// ====================================================
// SIMILARITY CALLBACK EXAMPLES
// ====================================================

// Euclidean distance for numerical vectors
// Euclidean distance for numerical vectors
function euclideanSimilarity(arrQuery_a, arrItem_a, objWeight_a) 
{
	var objResult = null;
	
	if (!Array.isArray(arrQuery_a) || !Array.isArray(arrItem_a) || arrQuery_a.length !== arrItem_a.length) 
	{
		objResult = new Infinitesimal(0);
	}
	else
	{
		var varSumSquares = 0;
		var varMaxDistance = 1000; // Normalization factor
		var intIndex = 0;
		
		for (intIndex = 0; intIndex < arrQuery_a.length; intIndex++) 
		{
			var varDiff = arrQuery_a[intIndex] - arrItem_a[intIndex];
			varSumSquares += varDiff * varDiff;
		}
		
		var varDistance = Math.sqrt(varSumSquares);
		var varSimilarity = 1 - Math.min(varDistance / varMaxDistance, 1);
		
		objResult = new Infinitesimal(varSimilarity);
		objResult = objResult.multiply(objWeight_a);
	}
	
	return objResult;
}

// Cosine similarity for text vectors
function cosineSimilarity(objQuery_a, objItem_a, objWeight_a) 
{
	var objResult = null;
	
	// Assume objects with term frequencies
	var varDotProduct = 0;
	var varQueryMag = 0;
	var varItemMag = 0;
	var strTerm = '';
	
	for (strTerm in objQuery_a) 
	{
		if (objItem_a[strTerm]) 
		{
			varDotProduct += objQuery_a[strTerm] * objItem_a[strTerm];
		}
		varQueryMag += objQuery_a[strTerm] * objQuery_a[strTerm];
	}
	
	for (strTerm in objItem_a) 
	{
		varItemMag += objItem_a[strTerm] * objItem_a[strTerm];
	}
	
	varQueryMag = Math.sqrt(varQueryMag);
	varItemMag = Math.sqrt(varItemMag);
	
	if (varQueryMag === 0 || varItemMag === 0) 
	{
		objResult = new Infinitesimal(0);
	}
	else
	{
		var varCosine = varDotProduct / (varQueryMag * varItemMag);
		objResult = new Infinitesimal(Math.max(0, varCosine));
		objResult = objResult.multiply(objWeight_a);
	}
	
	return objResult;
}

// Jaccard similarity for sets
function jaccardSimilarity(arrQuery_a, arrItem_a, objWeight_a) 
{
	var objResult = null;
	
	// Create lookup objects instead of Set
	var objLookup1 = {};
	var objLookup2 = {};
	var objCombined = {};
	var intIndex = 0;
	var intIntersection = 0;
	var intUnion = 0;
	var strKey = '';
	
	// Build lookup for first array
	for (intIndex = 0; intIndex < arrQuery_a.length; intIndex++) 
	{
		objLookup1[arrQuery_a[intIndex]] = true;
	}
	
	// Build lookup for second array
	for (intIndex = 0; intIndex < arrItem_a.length; intIndex++) 
	{
		objLookup2[arrItem_a[intIndex]] = true;
	}
	
	// Build combined object for union count
	for (strKey in objLookup1) 
	{
		objCombined[strKey] = true;
	}
	for (strKey in objLookup2) 
	{
		objCombined[strKey] = true;
	}
	
	// Count union
	for (strKey in objCombined) 
	{
		intUnion++;
	}
	
	// Count intersection
	for (strKey in objLookup1) 
	{
		if (objLookup2[strKey]) 
		{
			intIntersection++;
		}
	}
	
	if (intUnion === 0) 
	{
		objResult = new Infinitesimal(1);
		objResult = objResult.multiply(objWeight_a);
	}
	else
	{
		var varJaccard = intIntersection / intUnion;
		objResult = new Infinitesimal(varJaccard);
		objResult = objResult.multiply(objWeight_a);
	}
	
	return objResult;
}

// Levenshtein distance for strings
function levenshteinSimilarity(strQuery_a, strItem_a, objWeight_a) 
{
	var objResult = null;
	var intMaxLen = Math.max(strQuery_a.length, strItem_a.length);
	
	if (intMaxLen === 0) 
	{
		objResult = new Infinitesimal(1);
		objResult = objResult.multiply(objWeight_a);
	}
	else
	{
		// Simple approximation using length difference for demo
		var intLengthDiff = Math.abs(strQuery_a.length - strItem_a.length);
		var varSimilarity = 1 - (intLengthDiff / intMaxLen);
		
		objResult = new Infinitesimal(Math.max(0, varSimilarity));
		objResult = objResult.multiply(objWeight_a);
	}
	
	return objResult;
}

// ====================================================
// TEST HARNESS
// ====================================================

function runJNeuralNetworkTests()
{
  var nn = null;
  var result = null;
  var stats = null;
  
  api.print('====================================================');
  api.print('JNEURALNETWORK WITH INFINITESIMAL TEST HARNESS');
  api.print('====================================================');
  api.print('');
  
  // Test 1: Basic Initialization and Training
  api.print('--- TEST 1: BASIC INITIALIZATION AND TRAINING ---');
  
  nn = new JNeuralNetwork();
  
  var trainingData = [
    { name: 'Alice', age: 30, city: 'Sydney' },
    { name: 'Bob', age: 25, city: 'Melbourne' },
    { name: 'Charlie', age: 35, city: 'Sydney' },
    { name: 'Diana', age: 28, city: 'Brisbane' },
    { name: 'Eve', age: 32, city: 'Perth' }
  ];
  
  nn.train(trainingData);
  
  stats = nn.getStats();
  api.print('Unique training records: ' + stats.uniqueTrainingRecords);
  api.print('Property weights count: ' + stats.propertyCount);
  api.print('');
  
  // Test 2: Basic Query
  api.print('--- TEST 2: BASIC QUERY ---');
  
  result = nn.query({ city: 'Sydney' });
  api.print('Query { city: "Sydney" }');
  api.print('  Confidence: ' + result.confidence);
  api.print('  Result: ' + JSON.stringify(result.result));
  api.print('');
  
  // Test 3: Multiple Matches with Weight Sorting
  api.print('--- TEST 3: MULTIPLE MATCHES WITH WEIGHT SORTING ---');
  
  // Train more Sydney data to increase weight for Sydney
  nn.train([
    { name: 'Frank', age: 40, city: 'Sydney' },
    { name: 'Grace', age: 29, city: 'Sydney' }
  ]);
  
  result = nn.query({ city: 'Sydney' });
  api.print('After adding 2 more Sydney records:');
  api.print('  Confidence: ' + result.confidence);
  api.print('  Result: ' + JSON.stringify(result.result));
  api.print('');
  
  // Test 4: Regular Expression Query
  api.print('--- TEST 4: REGULAR EXPRESSION QUERY ---');
  
  result = nn.query({ name: /^[A-C]/ }); // Names starting with A, B, C
  api.print('Query { name: /^[A-C]/ }');
  api.print('  Confidence: ' + result.confidence);
  api.print('  Result: ' + JSON.stringify(result.result));
  api.print('');
  
  // Test 5: Multiple Property Query
  api.print('--- TEST 5: MULTIPLE PROPERTY QUERY ---');
  
  result = nn.query({ city: 'Sydney', age: 30 });
  api.print('Query { city: "Sydney", age: 30 }');
  api.print('  Confidence: ' + result.confidence);
  api.print('  Result: ' + JSON.stringify(result.result));
  api.print('');
  
  // Test 6: Infinitesimal Precision Demonstration
  api.print('--- TEST 6: INFINITESIMAL PRECISION DEMONSTRATION ---');
  
  var nn2 = new JNeuralNetwork();
  
  // Create training data with very similar records
  nn2.train([
    { id: 1, value: 100, tag: 'common' },
    { id: 2, value: 100, tag: 'common' },
    { id: 3, value: 100, tag: 'common' },
    { id: 4, value: 101, tag: 'rare' },
    { id: 5, value: 102, tag: 'rare' }
  ]);
  
  // Query with exact match - all have same base score
  result = nn2.query({ value: 100 });
  api.print('Query { value: 100 }');
  api.print('  Confidence: ' + result.confidence.toString());
  api.print('  Result: ' + JSON.stringify(result.result));
  api.print('  All matches:');
  
  var matches = nn2.query({ value: 100 }, { useInfinitesimals: true }).allMatches;
  for (var i = 0; i < matches.length; i++) {
    var weight = nn2.getPropertyStats('value').values.find(function(v) { 
      return v.value == matches[i].value; 
    }).weight;
    api.print('    ' + JSON.stringify(matches[i]) + ' weight: ' + weight.toString());
  }
  api.print('');
  
  // Test 7: Custom Similarity Callback
  api.print('--- TEST 7: CUSTOM SIMILARITY CALLBACK ---');
  
  var nn3 = new JNeuralNetwork();
  
  // Register Euclidean similarity for vector property
  nn3.registerSimilarity('vector', euclideanSimilarity);
  
  // Train with vector data
  nn3.train([
    { id: 'A', vector: [1, 2, 3] },
    { id: 'B', vector: [4, 5, 6] },
    { id: 'C', vector: [1, 2, 4] }
  ]);
  
  // Query with a vector
  result = nn3.query({ vector: [1, 2, 3] });
  api.print('Query { vector: [1,2,3] }');
  api.print('  Confidence: ' + result.confidence.toString());
  api.print('  Result: ' + JSON.stringify(result.result));
  api.print('');
  
  // Test 8: Cosine Similarity for Text
  api.print('--- TEST 8: COSINE SIMILARITY FOR TEXT ---');
  
  var nn4 = new JNeuralNetwork();
  nn4.registerSimilarity('text', cosineSimilarity);
  
  nn4.train([
    { id: 'doc1', text: { cat: 1, dog: 2, fish: 1 } },
    { id: 'doc2', text: { cat: 2, bird: 1, fish: 1 } },
    { id: 'doc3', text: { dog: 3, cat: 1, mouse: 2 } }
  ]);
  
  result = nn4.query({ text: { cat: 1, dog: 2 } });
  api.print('Query with text vector');
  api.print('  Confidence: ' + result.confidence.toString());
  api.print('  Result: ' + JSON.stringify(result.result));
  api.print('');
  
  // Test 9: Property Statistics
  api.print('--- TEST 9: PROPERTY STATISTICS ---');
  
  stats = nn.getPropertyStats('city');
  if (stats) {
    api.print('City statistics:');
    api.print('  Total count: ' + stats.totalCount.toString());
    api.print('  Top values:');
    for (var i = 0; i < Math.min(3, stats.values.length); i++) {
      api.print('    ' + stats.values[i].value + ': ' + stats.values[i].weight.toString());
    }
  }
  api.print('');
  
  // Test 10: Threshold Filtering
  api.print('--- TEST 10: THRESHOLD FILTERING ---');
  
  result = nn.query({ city: 'Sydney' }, { threshold: 0.5 });
  api.print('Query { city: "Sydney" } with threshold 0.5');
  api.print('  Match count: ' + result.matchCount);
  api.print('  Results: ' + JSON.stringify(result.allMatches));
  api.print('');
  
  // Test 11: Get/Set Data Serialization
  api.print('--- TEST 11: GET/SET DATA SERIALIZATION ---');
  
  var savedData = nn.getData();
  var nn5 = new JNeuralNetwork();
  nn5.setData(savedData);
  
  result = nn5.query({ city: 'Sydney' });
  api.print('After save/restore, query { city: "Sydney" }');
  api.print('  Confidence: ' + result.confidence);
  api.print('  Result: ' + JSON.stringify(result.result));
  api.print('');
  
  // Test 12: Infinitesimal vs Regular Comparison
  api.print('--- TEST 12: INFINITESIMAL VS REGULAR COMPARISON ---');
  
  var nn6 = new JNeuralNetwork();
  nn6.train([
    { score: 95, frequent: true },
    { score: 95, frequent: true },
    { score: 95, frequent: true },
    { score: 96, frequent: false }
  ]);
  
  api.print('Query { score: 95 } with regular numbers:');
  var regularResult = nn6.query({ score: 95 }, { useInfinitesimals: false });
  api.print('  Confidence: ' + regularResult.confidence);
  api.print('  Result: ' + JSON.stringify(regularResult.result));
  
  api.print('Query { score: 95 } with infinitesimals:');
  var infiniteResult = nn6.query({ score: 95 }, { useInfinitesimals: true });
  api.print('  Confidence: ' + infiniteResult.confidence.toString());
  api.print('  Result: ' + JSON.stringify(infiniteResult.result));
  
  // Show the weight differences
  var weightStats = nn6.getPropertyStats('score');
  api.print('Score weights:');
  api.print('  95: ' + weightStats.values.find(function(v) { return v.value == 95; }).weight.toString());
  api.print('  96: ' + weightStats.values.find(function(v) { return v.value == 96; }).weight.toString());
  api.print('');
  
  // Test 13: Regular Expression with Infinitesimal Gradation
  api.print('--- TEST 13: REGULAR EXPRESSION WITH INFINITESIMAL GRADATION ---');
  
  var nn13 = new JNeuralNetwork();
  
  // Register a custom regex callback that returns gradated scores
  nn13.registerSimilarity('name', function(query_regex, item_value, weight) {
    if (!(query_regex instanceof RegExp)) {
      return new Infinitesimal(0);
    }
    
    var strValue = String(item_value);
    var blnMatch = query_regex.test(strValue);
    
    if (!blnMatch) {
      return new Infinitesimal(0);
    }
    
    // Base match gives 1
    var result = new Infinitesimal(1);
    
    // Extract the matched portion
    var matchResult = strValue.match(query_regex);
    if (matchResult) {
      var matchText = matchResult[0];
      var matchLength = matchText.length;
      var fullLength = strValue.length;
      
      // Better matches (longer match relative to string) get higher magnitude
      var quality = matchLength / fullLength;
      
      // Nudge up based on match quality (0-9 scale)
      var nudgeCount = Math.floor(quality * 9);
      for (var i = 0; i < nudgeCount; i++) {
        result = result.nudgePositive();
      }
      
      // Extra nudges for exact match
      if (matchLength === fullLength) {
        result = result.nudgePositive().nudgePositive();
      }
    }
    
    return result.multiply(weight);
  });
  
  // Train with various names
  nn13.train([
    { id: 1, name: 'apple' },
    { id: 2, name: 'apples' },
    { id: 3, name: 'application' },
    { id: 4, name: 'banana' },
    { id: 5, name: 'apricot' },
    { id: 6, name: 'APPLE' },
    { id: 7, name: 'Apple' }
  ]);
  
  api.print('Query with /^appl/i (case insensitive):');
  var result13 = nn13.query({ name: /^appl/i });
  api.print('  Best match: ' + JSON.stringify(result13.result));
  api.print('  Confidence: ' + result13.confidence.toString());
  
  api.print('All matches sorted by similarity:');
  var allMatches13 = nn13.query({ name: /^appl/i }).allMatches;
  for (var i13 = 0; i13 < allMatches13.length; i13++) {
    var item13 = allMatches13[i13];
    // Need to recalc individual scores - in real use would store them
    var tempNN = new JNeuralNetwork();
    tempNN.registerSimilarity('name', function(q, v, w) {
      return nn13.query({ name: q }).confidence; // Simplified for demo
    });
    api.print('  ' + JSON.stringify(item13));
  }
  api.print('');

  // Test 14: Multiple Regex Patterns
  api.print('--- TEST 14: MULTIPLE REGEX PATTERNS ---');
  
  var nn14 = new JNeuralNetwork();
  
  nn14.registerSimilarity('tags', function(query_array, item_array, weight) {
    if (!Array.isArray(query_array) || !Array.isArray(item_array)) {
      return new Infinitesimal(0);
    }
    
    var score = new Infinitesimal(0);
    
    for (var q = 0; q < query_array.length; q++) {
      var queryPattern = query_array[q];
      for (var i = 0; i < item_array.length; i++) {
        var itemValue = item_array[i];
        if (queryPattern.test(itemValue)) {
          score = score.add(new Infinitesimal(1));
          // Nudge for each matching pattern
          score = score.nudgePositive();
        }
      }
    }
    
    return score.multiply(weight);
  });
  
  nn14.train([
    { id: 'doc1', tags: ['apple', 'fruit', 'food'] },
    { id: 'doc2', tags: ['apple', 'iphone', 'tech'] },
    { id: 'doc3', tags: ['banana', 'fruit', 'yellow'] },
    { id: 'doc4', tags: ['apple', 'macbook', 'tech'] },
    { id: 'doc5', tags: ['orange', 'fruit', 'citrus'] }
  ]);
  
  var result14 = nn14.query({ tags: [/^app/, /tech$/] });
  api.print('Query with patterns: [/^app/, /tech$/]');
  api.print('  Best match: ' + JSON.stringify(result14.result));
  api.print('  Confidence: ' + result14.confidence.toString());
  api.print('');

  // Test 15: Fuzzy Regex Matching with Levenshtein
  api.print('--- TEST 15: FUZZY REGEX MATCHING ---');
  
  function levenshteinDistance(str1, str2) {
    var len1 = str1.length;
    var len2 = str2.length;
    var matrix = [];
    
    for (var i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }
    for (var j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }
    
    for (var i = 1; i <= len1; i++) {
      for (var j = 1; j <= len2; j++) {
        var cost = str1[i-1] === str2[j-1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i-1][j] + 1,
          matrix[i][j-1] + 1,
          matrix[i-1][j-1] + cost
        );
      }
    }
    
    return matrix[len1][len2];
  }
  
  var nn15 = new JNeuralNetwork();
  
  nn15.registerSimilarity('word', function(query_regex, item_value, weight) {
    if (!(query_regex instanceof RegExp)) {
      return new Infinitesimal(0);
    }
    
    var strValue = String(item_value);
    var strPattern = query_regex.source;
    
    // Remove regex delimiters and flags for pattern string
    strPattern = strPattern.replace(/^\^|\$$/g, '');
    
    // Calculate Levenshtein distance between pattern and actual value
    var distance = levenshteinDistance(strPattern, strValue);
    var maxLen = Math.max(strPattern.length, strValue.length);
    
    if (maxLen === 0) {
      return new Infinitesimal(1).multiply(weight);
    }
    
    // Convert distance to similarity (0-1)
    var similarity = 1 - (distance / maxLen);
    
    var result = new Infinitesimal(Math.max(0, similarity));
    
    // Nudge based on exact pattern match
    if (query_regex.test(strValue)) {
      result = result.nudgePositive().nudgePositive();
    }
    
    return result.multiply(weight);
  });
  
  nn15.train([
    { id: 1, word: 'apple' },
    { id: 2, word: 'apples' },
    { id: 3, word: 'aple' },
    { id: 4, word: 'banana' },
    { id: 5, word: 'orange' },
    { id: 6, word: 'appl' }
  ]);
  
  api.print('Fuzzy matching for pattern "apple":');
  var result15 = nn15.query({ word: /apple/ });
  api.print('  Best match: ' + JSON.stringify(result15.result));
  api.print('  Confidence: ' + result15.confidence.toString());
  
  api.print('  All matches (sorted by similarity):');
  var allMatches15 = nn15.query({ word: /apple/ }).allMatches;
  for (var i15 = 0; i15 < allMatches15.length; i15++) {
    api.print('    ' + JSON.stringify(allMatches15[i15]));
  }
  api.print('');

  // Test 16: Case Sensitivity with Regex
  api.print('--- TEST 16: CASE SENSITIVITY WITH REGEX ---');
  
  var nn16 = new JNeuralNetwork();
  
  nn16.registerSimilarity('code', function(query_regex, item_value, weight) {
    if (!(query_regex instanceof RegExp)) {
      return new Infinitesimal(0);
    }
    
    var strValue = String(item_value);
    var blnMatch = query_regex.test(strValue);
    
    if (!blnMatch) {
      return new Infinitesimal(0);
    }
    
    var result = new Infinitesimal(1);
    
    // Check if case sensitive match was required vs actual
    var hasCaseFlag = query_regex.flags.indexOf('i') === -1;
    var isExactCase = hasCaseFlag ? strValue === query_regex.source.replace(/^\^|\$$/g, '') : true;
    
    if (isExactCase) {
      result = result.nudgePositive().nudgePositive();
    } else if (hasCaseFlag) {
      // Pattern requested case sensitive but got case insensitive match
      result = result.nudgeBack();
    }
    
    return result.multiply(weight);
  });
  
  nn16.train([
    { id: 1, code: 'ABC123' },
    { id: 2, code: 'abc123' },
    { id: 3, code: 'ABC456' },
    { id: 4, code: 'def789' }
  ]);
  
  api.print('Case sensitive query /^ABC/:');
  var result16a = nn16.query({ code: /^ABC/ });
  api.print('  Best match: ' + JSON.stringify(result16a.result));
  api.print('  Confidence: ' + result16a.confidence.toString());
  
  api.print('Case insensitive query /^ABC/i:');
  var result16b = nn16.query({ code: /^ABC/i });
  api.print('  Best match: ' + JSON.stringify(result16b.result));
  api.print('  Confidence: ' + result16b.confidence.toString());
  api.print('');

  // Test 17: Numeric Range with Regex
  api.print('--- TEST 17: NUMERIC RANGE WITH REGEX ---');
  
  var nn17 = new JNeuralNetwork();
  
  nn17.registerSimilarity('number', function(query_regex, item_value, weight) {
    if (!(query_regex instanceof RegExp)) {
      return new Infinitesimal(0);
    }
    
    var numValue = parseFloat(item_value);
    if (isNaN(numValue)) {
      return new Infinitesimal(0);
    }
    
    var strValue = String(item_value);
    var blnMatch = query_regex.test(strValue);
    
    if (!blnMatch) {
      return new Infinitesimal(0);
    }
    
    var result = new Infinitesimal(1);
    
    // Extract numeric range from regex (simplified)
    if (query_regex.source.indexOf('\\d') !== -1) {
      // Just has digits, match quality based on number of digits
      var digitCount = (strValue.match(/\d/g) || []).length;
      for (var i = 0; i < digitCount; i++) {
        result = result.nudgePositive();
      }
    }
    
    return result.multiply(weight);
  });
  
  nn17.train([
    { id: 1, number: '123' },
    { id: 2, number: '456' },
    { id: 3, number: '7890' },
    { id: 4, number: '12' },
    { id: 5, number: '1' }
  ]);
  
  api.print('Query with /\\d{3}/ (exactly 3 digits):');
  var result17 = nn17.query({ number: /\d{3}/ });
  api.print('  Best match: ' + JSON.stringify(result17.result));
  api.print('  Confidence: ' + result17.confidence.toString());
  api.print('  All matches:');
  var allMatches17 = result17.allMatches;
  for (var i17 = 0; i17 < allMatches17.length; i17++) {
    api.print('    ' + JSON.stringify(allMatches17[i17]));
  }
  api.print('');

  // Test 18: Combining Multiple Regex Properties
  api.print('--- TEST 18: COMBINING MULTIPLE REGEX PROPERTIES ---');
  
  var nn18 = new JNeuralNetwork();
  
  // Register different callbacks for different properties
  nn18.registerSimilarity('firstName', function(q, v, w) {
    return new Infinitesimal(q.test(v) ? 1 : 0).multiply(w);
  });
  
  nn18.registerSimilarity('lastName', function(q, v, w) {
    var result = new Infinitesimal(q.test(v) ? 1 : 0);
    // Longer last names get higher confidence
    if (q.test(v)) {
      for (var i = 0; i < v.length; i++) {
        result = result.nudgePositive();
      }
    }
    return result.multiply(w);
  });
  
  nn18.registerSimilarity('age', function(q, v, w) {
    var numAge = parseInt(v);
    if (isNaN(numAge)) return new Infinitesimal(0);
    
    var result = new Infinitesimal(q.test(v) ? 1 : 0);
    
    // Nudge based on age range
    if (numAge >= 18 && numAge <= 65) {
      result = result.nudgePositive();
    }
    if (numAge >= 25 && numAge <= 45) {
      result = result.nudgePositive();
    }
    
    return result.multiply(w);
  });
  
  nn18.train([
    { id: 1, firstName: 'John', lastName: 'Smith', age: '32' },
    { id: 2, firstName: 'Jane', lastName: 'Johnson', age: '28' },
    { id: 3, firstName: 'Bob', lastName: 'Williams', age: '45' },
    { id: 4, firstName: 'Alice', lastName: 'Brown', age: '19' },
    { id: 5, firstName: 'Charlie', lastName: 'Jones', age: '55' }
  ]);
  
  var result18 = nn18.query({
    firstName: /^J/,
    lastName: /son$/,
    age: /\d{2}/
  });
  
  api.print('Query with multiple regex patterns:');
  api.print('  firstName: /^J/, lastName: /son$/, age: /\\d{2}/');
  api.print('  Best match: ' + JSON.stringify(result18.result));
  api.print('  Confidence: ' + result18.confidence.toString());
  
  api.print('  All matches sorted:');
  for (var i18 = 0; i18 < result18.allMatches.length; i18++) {
    api.print('    ' + JSON.stringify(result18.allMatches[i18]));
  }
  api.print('');

  api.print('====================================================');
  api.print('TEST HARNESS COMPLETE');
  api.print('====================================================');
}

// Run the tests
runJNeuralNetworkTests();