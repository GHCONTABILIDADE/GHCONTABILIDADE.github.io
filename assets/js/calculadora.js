var SimuladorApp = angular.module('SimuladorApp',[]);

SimuladorApp.controller('SimuladorController', ['$scope', function($scope) {

	$scope.qtdSocios = 0;
	$scope.qtdFuncionarios = 0;
	$scope.simples = 0;
	$scope.ltFaturamento = [
	  "AtÃ© R$ 10.000/mÃªs",
		"de R$ 10.000,01 atÃ© 50.000,00/mÃªs",
		"de R$ 50.000,01 atÃ© 100.000,00/mÃªs",
        "mais de R$ 100.000,01" ];

	$scope.indice = 0;
	$scope.valorContadorAtual = 499;
	$scope.valorDescontoAnual = 0;
	$scope.valorMensalidade = 0;
	$scope.valorDescontoAnualPct = 0;

	$scope.valorAdicionalSocios = 0;
	$scope.valorAdicionalFuncionarios = 0;

	$scope.verificaValor = function(event, qntToCompare, model){

        if (event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 38 || event.keyCode == 40) return false;

        var valueNumber = -1;
        try{
            valueNumber = new Number(event.currentTarget.value);
        }catch(e){}

        if (valueNumber == -1) $scope[model] = 10;
        if (valueNumber > qntToCompare) $scope[model] = qntToCompare;
    }

	$scope.atualizaFaturamento = function(i) {
		$scope.indice = i;

		console.log($scope.indice);
	}

	$scope.calculaValor = function() {

		// ---------------------------
		// Calcula o  valor adicional por sÃ³cio
		// ---------------------------

		$scope.valorAdicionalSocios = 0;

		//if ($scope.qtdSocios > 2) {
			var qtdAdicionais = $scope.qtdSocios;// - 2;

			for (i = 0; i < qtdAdicionais; i++) {
				$scope.valorAdicionalSocios = $scope.valorAdicionalSocios + 20;
			}
		//}

		// ---------------------------
		// Calcula o  valor adicional por funcionÃ¡rio
		// ---------------------------
		$scope.valorAdicionalFuncionarios = 0;

		if ($scope.qtdFuncionarios > 0) {
			for (i = 0; i < $scope.qtdFuncionarios; i++) {
				$scope.valorAdicionalFuncionarios = $scope.valorAdicionalFuncionarios + 20;
			}
		}



		if ($scope.simples == 0) {
			var valores = [89.90, 149.90, 249.90, "consultar"];
		} else if ($scope.simples == 1) {
			var valores = [99.90, 199.90, 299.90, "consultar"];
		} else if ($scope.simples == 2) {
			var valores = [199.90, 299.90, 349.90, "consultar"];
        } else if ($scope.simples == 3) {
			var valores = [49.90, "-", "-", "-"];
		} else if ($scope.simples == 4) {
			var valores = [74.90, "-", "-", "-"];
		} else if ($scope.simples == 5) {
			var valores = [49.90,  "-", "-", "-"];
		}
		
        
        
        //if ($scope.assessoria == 1) {
        //    valores[$scope.indice] += 99;
        //} else {
        //    valores[$scope.indice] += 0;
        //}
        
        

		$scope.valorMensalidade = valores[$scope.indice];
		$scope.valorDescontoAnual = 0;
		$scope.valorDescontoAnualPct = 0;
		

		//$scope.valorDescontoAnual = 0;//(12 * $scope.valorContadorAtual) - (12 * ($scope.valorMensalidade + $scope.valorAdicionalSocios + $scope.valorAdicionalFuncionarios));
		
		if (typeof $scope.valorMensalidade == "number") {
			$scope.valorMensalidade = $scope.valorMensalidade + $scope.valorAdicionalSocios + $scope.valorAdicionalFuncionarios;
			$scope.valorDescontoAnual = 12 * ($scope.valorContadorAtual - $scope.valorMensalidade);
			$scope.valorDescontoAnual = $scope.valorDescontoAnual.toFixed(2);
			$scope.valorDescontoAnualPct = 100 - (100 * $scope.valorMensalidade / $scope.valorContadorAtual)
			$scope.valorDescontoAnualPct = $scope.valorDescontoAnualPct.toFixed(2);
		}
		
		if ($scope.valorDescontoAnual < 0) {
			$scope.valorDescontoAnual = 0;
			$scope.valorDescontoAnualPct = 0;
		} 

	}

	$scope.calculaValor();

	// ---------------------------
	// Fica monitorando as variÃ¡veis para recalcular o valor caso algo seja alterado
	// ---------------------------
	$scope.$watch("qtdSocios", function() {
		$scope.calculaValor();
	});
	$scope.$watch("qtdFuncionarios", function() {
		$scope.calculaValor();
	});
	$scope.$watch("simples", function() {
		$scope.calculaValor();
	});
    
    $scope.$watch("assessoria", function() {
		$scope.calculaValor();
	});
    
    
	$scope.$watch("indice", function() {
		$scope.calculaValor();
	});
  $scope.$watch("valorContadorAtual", function() {
    $scope.calculaValor();
	});
}]);
