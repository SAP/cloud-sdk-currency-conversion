/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  SingleFixedRateConversionResult,
  BulkFixedRateConversionResult,
  ConversionParametersForFixedRate,
  CurrencyAmount,
  CurrencyConversionError
} from '@sap-cloud-sdk/currency-conversion-models';
import { BigNumber } from 'bignumber.js';
import { CurrencyConverter } from '../../src/core/conversion-api';
import { ConversionError } from '../../src/constants/conversion-error';

const inrUsdConversionParameter: ConversionParametersForFixedRate = new ConversionParametersForFixedRate(
  'INR',
  'USD',
  '10.00',
  '70.23'
);
const currencyAmount: CurrencyAmount = new CurrencyAmount('702.3');
const roundedOffAmount: CurrencyAmount = new CurrencyAmount('702.30');
const expectedSingleFixedRateConversionResult: SingleFixedRateConversionResult = new SingleFixedRateConversionResult(
  currencyAmount,
  roundedOffAmount
);

const inrUsdConversionParameter2: ConversionParametersForFixedRate = new ConversionParametersForFixedRate(
  'INR',
  'USD',
  '10.00',
  '70.23'
);
const currAmount: CurrencyAmount = new CurrencyAmount('702.3');
const roundedAmount: CurrencyAmount = new CurrencyAmount('702.30');
const inrUsdExpectedSingleFixedRateConversionResult: SingleFixedRateConversionResult = new SingleFixedRateConversionResult(
  currAmount,
  roundedAmount
);

const usdEurConversionParameter: ConversionParametersForFixedRate = new ConversionParametersForFixedRate(
  'USD',
  'EUR',
  '1000',
  '10'
);
const currencyAmount1: CurrencyAmount = new CurrencyAmount('10000');
const roundedOffAmount1: CurrencyAmount = new CurrencyAmount('10000.00');
const expectedSingleFixedRateConversionResult1: SingleFixedRateConversionResult = new SingleFixedRateConversionResult(
  currencyAmount1,
  roundedOffAmount1
);

const usdInrConversionParameter: ConversionParametersForFixedRate = new ConversionParametersForFixedRate(
  'USD',
  'INR',
  '15.25',
  '10'
);
const currencyAmount2: CurrencyAmount = new CurrencyAmount('152.5');
const roundedOffAmount2: CurrencyAmount = new CurrencyAmount('152.50');
const expectedSingleFixedRateConversionResult2: SingleFixedRateConversionResult = new SingleFixedRateConversionResult(
  currencyAmount2,
  roundedOffAmount2
);

const eurInrConversionParameter: ConversionParametersForFixedRate = new ConversionParametersForFixedRate(
  'EUR',
  'INR',
  '100',
  '10.25'
);
const currencyAmount3: CurrencyAmount = new CurrencyAmount('1025');
const roundedOffAmount3: CurrencyAmount = new CurrencyAmount('1025.00');
const expectedSingleFixedRateConversionResult3: SingleFixedRateConversionResult = new SingleFixedRateConversionResult(
  currencyAmount3,
  roundedOffAmount3
);

const expectedEntries = [
  [inrUsdConversionParameter, expectedSingleFixedRateConversionResult],
  [usdEurConversionParameter, expectedSingleFixedRateConversionResult1],
  [usdInrConversionParameter, expectedSingleFixedRateConversionResult2],
  [eurInrConversionParameter, expectedSingleFixedRateConversionResult3]
];
const expectedEntrySet = new Set(expectedEntries);

const currencyConverter: CurrencyConverter = new CurrencyConverter();

describe('Convert Fixed Rate Currency', () => {
  it('Convert Currency Positive', () => {
    const result: SingleFixedRateConversionResult = currencyConverter.convertCurrencyWithFixedRate(
      new ConversionParametersForFixedRate('INR', 'USD', '10.00', '70.23')
    );
    expect(result.convertedAmount.valueString).toEqual('702.3');
    expect(result.convertedAmount.decimalValue).toEqual(new BigNumber(702.3));
    expect(result.roundedOffConvertedAmount.valueString).toEqual('702.30');
    expect(result.roundedOffConvertedAmount.decimalValue).toEqual(
      new BigNumber(702.3)
    );
  });

  it('Convert Currency for very small currency rate.', () => {
    const result: SingleFixedRateConversionResult = currencyConverter.convertCurrencyWithFixedRate(
      new ConversionParametersForFixedRate(
        'VES',
        'EUR',
        '10.00',
        '0.00000283242'
      )
    );
    expect(result.convertedAmount.valueString).toEqual('0.0000283242');
  });

  it('Convert Currency with invalid country code', () => {
    let errInput = new Error();
    try {
      const result: SingleFixedRateConversionResult = currencyConverter.convertCurrencyWithFixedRate(
        new ConversionParametersForFixedRate('...', 'USD', '10.00', '70.23')
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe('Provided currency code does not exist.');
  });

  it('Convert Currency with null as conversion parameter', () => {
    let errInput = new Error();
    try {
      const inputArray: ConversionParametersForFixedRate[] = new Array();
      const inputParam: ConversionParametersForFixedRate = inputArray[0];
      const result: SingleFixedRateConversionResult = currencyConverter.convertCurrencyWithFixedRate(
        inputParam
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput).toBeInstanceOf(CurrencyConversionError);
    expect(errInput.message).toBe(ConversionError.INVALID_PARAMS);
  });

  it('Convert Currency with same currency pair.', () => {
    const result: SingleFixedRateConversionResult = currencyConverter.convertCurrencyWithFixedRate(
      new ConversionParametersForFixedRate(
        'EUR',
        'EUR',
        '10.00',
        '0.00000283242'
      )
    );
    expect(result.convertedAmount.valueString).toEqual('10');
    expect(result.convertedAmount.decimalValue).toEqual(new BigNumber(10));
    expect(result.roundedOffConvertedAmount.valueString).toEqual('10.00');
    expect(result.roundedOffConvertedAmount.decimalValue).toEqual(
      new BigNumber(10.0)
    );
  });

  it('Convert bulk fixed rate currency with single conversion parameter', () => {
    const result: BulkFixedRateConversionResult = currencyConverter.convertCurrenciesWithFixedRate(
      Array.of(inrUsdConversionParameter)
    );
    expect(result.get(inrUsdConversionParameter)).toBeInstanceOf(
      SingleFixedRateConversionResult
    );
    expect(
      (result.get(inrUsdConversionParameter) as SingleFixedRateConversionResult)
        .convertedAmount.valueString
    ).toEqual('702.3');
    expect(
      (result.get(inrUsdConversionParameter) as SingleFixedRateConversionResult)
        .convertedAmount.decimalValue
    ).toEqual(new BigNumber(702.3));
    expect(
      (result.get(inrUsdConversionParameter) as SingleFixedRateConversionResult)
        .roundedOffConvertedAmount.valueString
    ).toEqual('702.30');
    expect(
      (result.get(inrUsdConversionParameter) as SingleFixedRateConversionResult)
        .roundedOffConvertedAmount.decimalValue
    ).toEqual(new BigNumber(702.3));
  });

  it('Convert bulk fixed rate currency with empty conversion parameter list', () => {
    let errInput = new Error();
    try {
      const result: BulkFixedRateConversionResult = currencyConverter.convertCurrenciesWithFixedRate(
        []
      );
    } catch (error) {
      errInput = error;
    }
    expect(errInput.message).toBe(ConversionError.INVALID_PARAMS);
  });

  it('Convert bulk fixed rate currency with maximum conversion parameters', () => {
    const maximumConversionParameterList: ConversionParametersForFixedRate[] = [];
    for (let i = 1; i <= 1000; i++) {
      maximumConversionParameterList.push(inrUsdConversionParameter);
    }
    const actualConversionResult: BulkFixedRateConversionResult = currencyConverter.convertCurrenciesWithFixedRate(
      maximumConversionParameterList
    );
    for (const param of maximumConversionParameterList) {
      expect(
        (actualConversionResult.get(
          inrUsdConversionParameter
        ) as SingleFixedRateConversionResult).convertedAmount.valueString
      ).toEqual('702.3');
      expect(
        (actualConversionResult.get(
          inrUsdConversionParameter
        ) as SingleFixedRateConversionResult).convertedAmount.decimalValue
      ).toEqual(new BigNumber(702.3));
      expect(
        (actualConversionResult.get(
          inrUsdConversionParameter
        ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
          .valueString
      ).toEqual('702.30');
      expect(
        (actualConversionResult.get(
          inrUsdConversionParameter
        ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
          .decimalValue
      ).toEqual(new BigNumber(702.3));
    }
  });

  it('Convert bulk fixed rate currency with more than 1000 conversion parameters', () => {
    const maximumConversionParameterList: ConversionParametersForFixedRate[] = [];
    let errInput = new Error();
    for (let i = 0; i <= 1000; i++) {
      maximumConversionParameterList.push(inrUsdConversionParameter);
    }
    try {
      expect(() => {
        currencyConverter.convertCurrenciesWithFixedRate(
          maximumConversionParameterList
        );
      }).toThrowError(ConversionError.INVALID_PARAMS);
    } catch (error) {
      errInput = error;
    }
  });

  it('Convert bulk fixed rate currency Rounded Off Value Exponent Four', () => {
    // For USD to CLF(exponent = 4)
    const convParam = new ConversionParametersForFixedRate(
      'USD',
      'CLF',
      '100.173412345',
      '1'
    );
    const currencyConvParamsArray = Array.of(convParam);
    const bulkResult = currencyConverter.convertCurrenciesWithFixedRate(
      currencyConvParamsArray
    );
    expect(() => {
      bulkResult.get(convParam);
    }).toBeTruthy();
    expect(
      (bulkResult.get(
        convParam
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toBe(4);
  });

  it('Convert bulk fixed rate currency Rounded Off Value Exponent Three', () => {
    // For USD to BHD(exponent = 3)
    const convParam = new ConversionParametersForFixedRate(
      'USD',
      'BHD',
      '100.1237891',
      '1'
    );
    const currencyConvParamsArray = Array.of(convParam);
    const bulkResult = currencyConverter.convertCurrenciesWithFixedRate(
      currencyConvParamsArray
    );
    expect(() => {
      bulkResult.get(convParam);
    }).toBeTruthy();
    expect(
      (bulkResult.get(
        convParam
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount.decimalValue.dp()
    ).toBe(3);
  });

  it('Convert bulk fixed rate currency Decimal Value ====> 120.4576776757575757567', () => {
    const convParam = new ConversionParametersForFixedRate(
      'INR',
      'EUR',
      '120.4576776757575757567',
      '123.123'
    );
    const currencyConvParamsArray = Array.of(convParam);
    const bulkResult = currencyConverter.convertCurrenciesWithFixedRate(
      currencyConvParamsArray
    );
    expect(() => {
      bulkResult.get(convParam);
    }).toBeTruthy();
    expect(
      (bulkResult.get(
        convParam
      ) as SingleFixedRateConversionResult).convertedAmount.valueString.toString()
    ).toBe('14831.1106484722999998921741');
  });

  it('Convert bulk fixed rate currency large Value ====> ', () => {
    const convParam = new ConversionParametersForFixedRate(
      'INR',
      'EUR',
      '98787865267567768726875264186578699878786526756776872687526418657869815869878786526756776872687526418657869987878652675677687268752641865786981586486148652875878268575386757936757578578543646785378158648614865287587826857538675793675757857854364678537486148652875878268575386757936757578578543646785378158648614865287587826857538675793675757857854364678537',
      '98787865267567768726875264186578699878786526756776872687526418657869815864861486528758782685753867579367575785785436467853781586486148652879878786526756776872687526418657869987878652675677687268752641865786981586486148652875878268575386757936757578578543646785378158648614865287587826857538675793675757857854364678537587826857538675793675757857854364678537'
    );
    const currencyConvParamsArray = Array.of(convParam);
    const bulkResult = currencyConverter.convertCurrenciesWithFixedRate(
      currencyConvParamsArray
    );
    expect(() => {
      bulkResult.get(convParam);
    }).toBeTruthy();
    expect(
      (bulkResult.get(
        convParam
      ) as SingleFixedRateConversionResult).convertedAmount.valueString.toString()
    ).toBe(
      '9759042324123122302276061802084751464976205790260865591072287979066261419563108862799067524457558067333455238181122387950338776464101064405392363553859884776235439642336862137098624773464369412489441645107681992741690571986804714033924438698423945613898596598094590792477646246778385770794637768975892188997724724234578609227199862948634377561872645406774206371896931236263178320706352918747432640380741764141688662050143056646393053901852212510025676270162036150233056954684103220172384813423425962350128295185226282971890577013965996593910502231759659534028035715341044275293098314251411026435748929919354059397749444716033924452049862780212050821509511644077922039260288451162314136847941253034349631348460369'
    );
  });

  it('Convert bulk fixed rate currency with multiple conversion parameters', () => {
    const conversionParameterList: ConversionParametersForFixedRate[] = [];
    const resultMap: Map<
      ConversionParametersForFixedRate,
      SingleFixedRateConversionResult | CurrencyConversionError
    > = new Map();

    resultMap.set(
      inrUsdConversionParameter,
      expectedSingleFixedRateConversionResult
    );
    resultMap.set(
      usdEurConversionParameter,
      expectedSingleFixedRateConversionResult1
    );
    resultMap.set(
      usdInrConversionParameter,
      expectedSingleFixedRateConversionResult2
    );
    resultMap.set(
      eurInrConversionParameter,
      expectedSingleFixedRateConversionResult3
    );

    const expectedConversionResult: BulkFixedRateConversionResult = new BulkFixedRateConversionResult(
      resultMap
    );

    conversionParameterList.push(inrUsdConversionParameter);
    conversionParameterList.push(usdEurConversionParameter);
    conversionParameterList.push(usdInrConversionParameter);
    conversionParameterList.push(eurInrConversionParameter);

    const actualConversionResult: BulkFixedRateConversionResult = currencyConverter.convertCurrenciesWithFixedRate(
      conversionParameterList
    );
    expect(actualConversionResult.entrySet()).toEqual(expectedEntrySet);
    for (const param of conversionParameterList) {
      expect(
        (actualConversionResult.get(param) as SingleFixedRateConversionResult)
          .convertedAmount.valueString
      ).toEqual(
        (expectedConversionResult.get(param) as SingleFixedRateConversionResult)
          .convertedAmount.valueString
      );
      expect(
        (actualConversionResult.get(param) as SingleFixedRateConversionResult)
          .convertedAmount.decimalValue
      ).toEqual(
        (expectedConversionResult.get(param) as SingleFixedRateConversionResult)
          .convertedAmount.decimalValue
      );
      expect(
        (actualConversionResult.get(param) as SingleFixedRateConversionResult)
          .roundedOffConvertedAmount.valueString
      ).toEqual(
        (expectedConversionResult.get(param) as SingleFixedRateConversionResult)
          .roundedOffConvertedAmount.valueString
      );
      expect(
        (actualConversionResult.get(param) as SingleFixedRateConversionResult)
          .roundedOffConvertedAmount.decimalValue
      ).toEqual(
        (expectedConversionResult.get(param) as SingleFixedRateConversionResult)
          .roundedOffConvertedAmount.decimalValue
      );
    }
  });

  it('Convert bulk fixed rate currency with duplicate conversion parameters', () => {
    const conversionParameterList: ConversionParametersForFixedRate[] = [];
    const resultMap: Map<
      ConversionParametersForFixedRate,
      SingleFixedRateConversionResult | CurrencyConversionError
    > = new Map();

    resultMap.set(
      inrUsdConversionParameter,
      expectedSingleFixedRateConversionResult
    );
    resultMap.set(
      usdEurConversionParameter,
      expectedSingleFixedRateConversionResult1
    );
    resultMap.set(
      inrUsdConversionParameter2,
      inrUsdExpectedSingleFixedRateConversionResult
    );

    const expectedConversionResult: BulkFixedRateConversionResult = new BulkFixedRateConversionResult(
      resultMap
    );

    conversionParameterList.push(inrUsdConversionParameter);
    conversionParameterList.push(usdEurConversionParameter);
    conversionParameterList.push(inrUsdConversionParameter2);

    const actualConversionResult: BulkFixedRateConversionResult = currencyConverter.convertCurrenciesWithFixedRate(
      conversionParameterList
    );
    for (const param of conversionParameterList) {
      expect(
        (actualConversionResult.get(param) as SingleFixedRateConversionResult)
          .convertedAmount.valueString
      ).toEqual(
        (expectedConversionResult.get(param) as SingleFixedRateConversionResult)
          .convertedAmount.valueString
      );
      expect(
        (actualConversionResult.get(param) as SingleFixedRateConversionResult)
          .convertedAmount.decimalValue
      ).toEqual(
        (expectedConversionResult.get(param) as SingleFixedRateConversionResult)
          .convertedAmount.decimalValue
      );
      expect(
        (actualConversionResult.get(param) as SingleFixedRateConversionResult)
          .roundedOffConvertedAmount.valueString
      ).toEqual(
        (expectedConversionResult.get(param) as SingleFixedRateConversionResult)
          .roundedOffConvertedAmount.valueString
      );
      expect(
        (actualConversionResult.get(param) as SingleFixedRateConversionResult)
          .roundedOffConvertedAmount.decimalValue
      ).toEqual(
        (expectedConversionResult.get(param) as SingleFixedRateConversionResult)
          .roundedOffConvertedAmount.decimalValue
      );
    }
    expect(
      (actualConversionResult.get(
        inrUsdConversionParameter
      ) as SingleFixedRateConversionResult).convertedAmount.valueString
    ).toEqual(
      (expectedConversionResult.get(
        inrUsdConversionParameter2
      ) as SingleFixedRateConversionResult).convertedAmount.valueString
    );
    expect(
      (actualConversionResult.get(
        inrUsdConversionParameter
      ) as SingleFixedRateConversionResult).convertedAmount.decimalValue
    ).toEqual(
      (expectedConversionResult.get(
        inrUsdConversionParameter2
      ) as SingleFixedRateConversionResult).convertedAmount.decimalValue
    );
    expect(
      (actualConversionResult.get(
        inrUsdConversionParameter
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    ).toEqual(
      (expectedConversionResult.get(
        inrUsdConversionParameter2
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    );
    expect(
      (actualConversionResult.get(
        inrUsdConversionParameter
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
        .decimalValue
    ).toEqual(
      (expectedConversionResult.get(
        inrUsdConversionParameter2
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
        .decimalValue
    );
    expect(
      (actualConversionResult.get(
        inrUsdConversionParameter2
      ) as SingleFixedRateConversionResult).convertedAmount.valueString
    ).toEqual(
      (expectedConversionResult.get(
        inrUsdConversionParameter
      ) as SingleFixedRateConversionResult).convertedAmount.valueString
    );
    expect(
      (actualConversionResult.get(
        inrUsdConversionParameter2
      ) as SingleFixedRateConversionResult).convertedAmount.decimalValue
    ).toEqual(
      (expectedConversionResult.get(
        inrUsdConversionParameter
      ) as SingleFixedRateConversionResult).convertedAmount.decimalValue
    );
    expect(
      (actualConversionResult.get(
        inrUsdConversionParameter2
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    ).toEqual(
      (expectedConversionResult.get(
        inrUsdConversionParameter
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
        .valueString
    );
    expect(
      (actualConversionResult.get(
        inrUsdConversionParameter2
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
        .decimalValue
    ).toEqual(
      (expectedConversionResult.get(
        inrUsdConversionParameter
      ) as SingleFixedRateConversionResult).roundedOffConvertedAmount
        .decimalValue
    );
  });
});
